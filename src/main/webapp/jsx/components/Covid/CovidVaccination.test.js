import React from "react";
import axios from "axios";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import CreateCovidVaccination from "./CreateCovidVaccination";
import UpdateCovidVaccination from "./UpdateCovidVaccination";
import {
  renderWithProviders,
  deferred,
  springError,
  networkError,
  routeGet,
  patient,
} from "../../testUtils";

jest.mock("axios");

const covidVaccines = [
  { id: 1, code: "COVID_VACCINE_PFIZER", name: "Pfizer" },
  { id: 2, code: "COVID_VACCINE_MODERNA", name: "Moderna" },
];
// What this LAMISPlus server answers for covid/codeset when no COVID module
// is installed: the SPA's index.html with HTTP 200.
const spaHtml = "<!doctype html><html lang=\"en\"><head></head></html>";

const covidRecord = {
  id: 91,
  immunizationType: "COVID_IMMUNIZATION",
  vaccinationDate: "2026-09-20",
  uniqueImmunizationData: {
    vaccinationDosage: "FIRST",
    workInHealthSector: "NO",
    knownMedicalCondition: "NO",
    adverseEffect: "NO",
    vaccineType: "COVID_VACCINE_PFIZER",
    vaccinationDate: "2026-09-20",
    location: "Community",
    batchNumber: "B-1",
  },
};

const routes = (vaccines) =>
  routeGet({
    "covid/codeset": vaccines,
    "application-codesets/v2/COVID_ADVERSE_EFFECT": [],
    "immunization/history/": { content: [] },
    "immunization/91": covidRecord,
  });

let setActiveContent;
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(toast, "success").mockImplementation(() => {});
  jest.spyOn(toast, "error").mockImplementation(() => {});
  setActiveContent = jest.fn();
});

const set = (container, name, value) =>
  fireEvent.change(container.querySelector(`#${name}`), { target: { name, value } });

describe("CreateCovidVaccination", () => {
  const renderCreate = () =>
    renderWithProviders(
      <CreateCovidVaccination
        patientObj={patient}
        activeContent={{ route: "covid-patient", actionType: "create" }}
        setActiveContent={setActiveContent}
      />
    );

  it("lists the vaccines returned by the server", async () => {
    axios.get.mockImplementation(routes(covidVaccines));
    renderCreate();
    expect(await screen.findByRole("option", { name: "Pfizer" })).toBeInTheDocument();
  });

  it("shows Saving... only while the save is in flight, then reports a network failure", async () => {
    axios.get.mockImplementation(routes(covidVaccines));
    const post = deferred();
    axios.post.mockReturnValue(post.promise);
    const { container } = renderCreate();
    await screen.findByRole("option", { name: "Pfizer" });
    await waitFor(() => expect(container.querySelector("#vaccinationDosage")).toHaveValue("FIRST"));
    set(container, "workInHealthSector", "NO");
    set(container, "knownMedicalCondition", "NO");
    set(container, "adverseEffect", "NO");
    set(container, "vaccineType", "COVID_VACCINE_PFIZER");
    set(container, "vaccinationDate", "2026-10-01");
    set(container, "location", "Community");
    set(container, "batchNumber", "B-1");

    const save = () => screen.getByRole("button", { name: /sav/i });
    expect(save()).toHaveTextContent(/^Save$/);
    fireEvent.click(save());
    await waitFor(() => expect(save()).toHaveTextContent("Saving..."));
    expect(save()).toBeDisabled();

    post.reject(networkError());
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "COVID-19 Vaccination could not be saved: Network Error"
      )
    );
    await waitFor(() => expect(save()).toHaveTextContent(/^Save$/));
  });
});

describe("CreateCovidVaccination dose numbering", () => {
  it("picks the next dose from all of the patient's COVID records", async () => {
    const routine = (id) => ({
      id,
      immunizationType: "ROUTINE_IMMUNIZATION",
      uniqueImmunizationData: { vaccineType: ["IMMUNIZATION_AT_9_YEARS_HPV"] },
    });
    axios.get.mockImplementation(
      routeGet({
        "covid/codeset": covidVaccines,
        "application-codesets/v2/COVID_ADVERSE_EFFECT": [],
        // The COVID first dose sits after 25 routine records (beyond one page of 20).
        "immunization/history/": {
          content: [
            ...Array.from({ length: 25 }, (_, i) => routine(100 + i)),
            { ...covidRecord, id: 7 },
          ],
        },
      })
    );
    const { container } = renderWithProviders(
      <CreateCovidVaccination
        patientObj={patient}
        activeContent={{ route: "covid-patient", actionType: "create" }}
        setActiveContent={setActiveContent}
      />
    );

    await waitFor(() =>
      expect(container.querySelector("#vaccinationDosage")).toHaveValue("SECOND")
    );
    const historyCall = axios.get.mock.calls.find(([url]) => url.includes("immunization/history/"));
    expect(new URL(historyCall[0], "http://host").searchParams.get("size")).toBe("1000");
  });
});

describe("UpdateCovidVaccination", () => {
  it("still opens a saved record when the vaccine endpoint answers with a non-list", async () => {
    axios.get.mockImplementation(routes(spaHtml));
    renderWithProviders(
      <UpdateCovidVaccination
        patientObj={patient}
        activeContent={{ route: "covid-patient", actionType: "view", id: 91 }}
        setActiveContent={setActiveContent}
        disableInputs={true}
      />
    );
    await waitFor(() =>
      expect(document.querySelector("#batchNumber")).toHaveValue("B-1")
    );
  });

  it("reports a failed update", async () => {
    axios.get.mockImplementation(routes(covidVaccines));
    axios.put.mockRejectedValue(springError(500, "Internal Server Error"));
    renderWithProviders(
      <UpdateCovidVaccination
        patientObj={patient}
        activeContent={{ route: "covid-patient", actionType: "update", id: 91 }}
        setActiveContent={setActiveContent}
        disableInputs={false}
      />
    );
    await waitFor(() =>
      expect(document.querySelector("#batchNumber")).toHaveValue("B-1")
    );

    fireEvent.click(screen.getByRole("button", { name: /updat/i }));

    await waitFor(
      () =>
        expect(toast.error).toHaveBeenCalledWith(
          "COVID-19 Vaccination could not be updated: Internal Server Error"
        ),
      { timeout: 8000 }
    );
  }, 15000);
});
