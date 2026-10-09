import React from "react";
import axios from "axios";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import PatientList from "./PatientList";
import PatientVaccinatedList from "./PatientVaccinatedList";
import { renderWithProviders } from "../../testUtils";

jest.mock("axios");

beforeEach(() => jest.clearAllMocks());

const params = (call) => new URL(call[0], "http://host").searchParams;
const lastCall = () => axios.get.mock.calls[axios.get.mock.calls.length - 1];
const searchBox = (container) => container.querySelector('input[placeholder="Search"]');

describe("PatientVaccinatedList (All Vaccinated Patients)", () => {
  const record = (patientId, firstName, surname, hospitalNumber) => ({
    id: patientId * 10,
    patientId,
    immunizationType: "ROUTINE_IMMUNIZATION",
    uniqueImmunizationData: {
      patientDto: {
        firstName,
        surname,
        sex: "Female",
        dateOfBirth: "2010-01-30",
        identifier: { identifier: [{ type: "HospitalNumber", value: hospitalNumber }] },
      },
    },
  });

  const page = (content, number, totalElements) => ({ data: { content, number, totalElements } });

  it("asks the server for page/size, shows its total, and pages through it", async () => {
    axios.get.mockImplementation((url) =>
      Promise.resolve(
        new URL(url, "http://host").searchParams.get("page") === "0"
          ? page([record(1, "Ebelebe", "Ake", "23434r3556")], 0, 11)
          : page([record(2, "Test", "Sync", "3445678fgh")], 1, 11)
      )
    );
    renderWithProviders(<PatientVaccinatedList />);

    expect(await screen.findByText("23434r3556")).toBeInTheDocument();
    expect(screen.getAllByText("1-10 of 11")[0]).toBeInTheDocument();
    const first = axios.get.mock.calls[0];
    expect(first[0]).toContain("immunization/patients");
    expect(params(first).get("page")).toBe("0");
    expect(params(first).get("size")).toBe("10");
    expect(params(first).has("pageNo")).toBe(false);

    fireEvent.click(screen.getAllByTitle("Next Page")[0].querySelector("button"));
    expect(await screen.findByText("3445678fgh")).toBeInTheDocument();
    expect(screen.getAllByText("11-11 of 11")[0]).toBeInTheDocument();
  });

  it("searches on the server and shows its matches without filtering them again", async () => {
    axios.get.mockImplementation((url) =>
      Promise.resolve(
        new URL(url, "http://host").searchParams.get("search") === "Ake"
          ? page([record(1, "Ebelebe", "Ake", "23434r3556")], 0, 1)
          : page(
              [record(1, "Ebelebe", "Ake", "23434r3556"), record(2, "Test", "Sync", "3445678fgh")],
              0,
              2
            )
      )
    );
    const { container } = renderWithProviders(<PatientVaccinatedList />);
    await screen.findByText("3445678fgh");

    // Names are hidden (PII off); the server still matches on them.
    fireEvent.change(searchBox(container), { target: { value: "Ake" } });

    await waitFor(() => expect(screen.queryByText("3445678fgh")).not.toBeInTheDocument());
    expect(screen.getByText("23434r3556")).toBeInTheDocument();
    expect(params(lastCall()).get("search")).toBe("Ake");
    expect(params(lastCall()).get("page")).toBe("0");
  });

  it("handles a failing server without unhandled promise rejections", async () => {
    const unhandled = [];
    const onUnhandled = (reason) => unhandled.push(reason);
    process.on("unhandledRejection", onUnhandled);
    try {
      axios.get.mockRejectedValue(
        Object.assign(new Error("Request failed with status code 400"), {
          response: { status: 400, data: { error: "Bad Request", message: "" } },
        })
      );
      renderWithProviders(<PatientVaccinatedList />);

      // react-query retries twice (~3s) before the table gives up.
      await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(3), { timeout: 8000 });
      await new Promise((r) => setTimeout(r, 200));
      expect(unhandled).toEqual([]);
      expect(await screen.findByText("Bad Request")).toBeInTheDocument();
    } finally {
      process.off("unhandledRejection", onUnhandled);
    }
  }, 20000);

  it("shows names and sex correctly when parts are missing", async () => {
    const noSurname = record(3, "Ada", undefined, "H-3");
    noSurname.uniqueImmunizationData.patientDto.sex = undefined;
    noSurname.uniqueImmunizationData.patientDto.gender = { display: "Male" };
    axios.get.mockResolvedValue(page([noSurname], 0, 1));
    const { container } = renderWithProviders(<PatientVaccinatedList />);
    await screen.findByText("H-3");

    fireEvent.click(container.querySelector("#showPP"));

    expect(await screen.findByText("Ada")).toBeInTheDocument();
    expect(screen.queryByText(/undefined/)).toBeNull();
    expect(screen.getByText("Male")).toBeInTheDocument();
  });
});

describe("PatientList (Find Patients)", () => {
  const patientPage = (records, currentPage, totalRecords) => ({
    data: { records, currentPage, totalRecords },
  });

  it("keeps the search result when the slower unfiltered first page arrives later", async () => {
    let releaseFirstPage;
    axios.get.mockImplementation((url) => {
      const search = new URL(url, "http://host").searchParams.get("searchParam");
      if (search === "3445678fgh") {
        return Promise.resolve(
          patientPage([{ id: 2, firstName: "Test", participantId: "3445678fgh" }], 0, 1)
        );
      }
      return new Promise((resolve) => {
        releaseFirstPage = () =>
          resolve(patientPage([{ id: 9, firstName: "Other", participantId: "9799000" }], 0, 24895));
      });
    });
    const { container } = renderWithProviders(<PatientList />);
    await waitFor(() => expect(releaseFirstPage).toBeDefined());

    // Search typed while the first page is still loading.
    fireEvent.change(searchBox(container), { target: { value: "3445678fgh" } });
    expect(await screen.findByText("3445678fgh")).toBeInTheDocument();

    releaseFirstPage();
    await new Promise((r) => setTimeout(r, 50));

    expect(screen.getByText("3445678fgh")).toBeInTheDocument();
    expect(screen.queryByText("9799000")).not.toBeInTheDocument();
    expect(screen.getAllByText("1-1 of 1")[0]).toBeInTheDocument();
  });

  it("sends the search text to the patient API and resets to the first page", async () => {
    axios.get.mockImplementation((url) =>
      Promise.resolve(
        new URL(url, "http://host").searchParams.get("searchParam") === "Ebelebe"
          ? patientPage(
              [{ id: 1, firstName: "Ebelebe", surname: "Ake", participantId: "23434r3556", dateOfBirth: "2010-01-30" }],
              0,
              1
            )
          : patientPage([{ id: 2, firstName: "Test", participantId: "3445678fgh", gender: null }], 0, 24895)
      )
    );
    const { container } = renderWithProviders(<PatientList />);
    expect(await screen.findByText("3445678fgh")).toBeInTheDocument();
    expect(screen.getAllByText("1-10 of 24895")[0]).toBeInTheDocument();

    fireEvent.change(searchBox(container), { target: { value: "Ebelebe" } });

    expect(await screen.findByText("23434r3556")).toBeInTheDocument();
    expect(params(lastCall()).get("searchParam")).toBe("Ebelebe");
    expect(params(lastCall()).get("pageNo")).toBe("0");
  });
});
