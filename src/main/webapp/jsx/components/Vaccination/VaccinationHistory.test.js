import React from "react";
import axios from "axios";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import VaccinationHistory from "./VaccinationHistory";
import {
  renderWithProviders,
  deferred,
  routeGet,
  codesetRoutes,
  patient,
} from "../../testUtils";

jest.mock("axios");

beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(toast, "success").mockImplementation(() => {});
  jest.spyOn(toast, "error").mockImplementation(() => {});
  axios.get.mockImplementation(
    routeGet({
      ...codesetRoutes,
      "covid/codeset": [],
      "immunization/history/": {
        content: [
          {
            id: 3,
            immunizationType: "TETANUS_IMMUNIZATION",
            vaccinationDate: "2026-09-16",
            uniqueImmunizationData: { vaccineType: "TETANUS_VACCINE_TD2", vaccinationDate: "2026-09-16" },
          },
          {
            id: 2,
            immunizationType: "ROUTINE_IMMUNIZATION",
            vaccinationDate: "2026-09-10",
            uniqueImmunizationData: {
              vaccineType: ["IMMUNIZATION_AT_9_YEARS_HPV"],
              missedVaccine: "yes",
              missedVaccineType: ["ROUTINE_VACCINE_TYPE_OPV_1"],
            },
          },
        ],
        totalElements: 2,
      },
    })
  );
});

const renderHistory = () =>
  renderWithProviders(
    <VaccinationHistory
      patientObj={patient}
      activeContent={{ route: "vaccination-history" }}
      setActiveContent={jest.fn()}
    />
  );

it("loads the patient's whole history in one request", async () => {
  renderHistory();
  await screen.findByText("Td2");
  const historyCall = axios.get.mock.calls.find(([url]) => url.includes("immunization/history/"));
  const params = new URL(historyCall[0], "http://host").searchParams;
  expect(params.get("page")).toBe("0");
  expect(params.get("size")).toBe("1000");
});

it("lists readable types and vaccine names, searchable by those names", async () => {
  const { container } = renderHistory();

  expect(await screen.findByText("Td2")).toBeInTheDocument();
  expect(screen.getByText("Tetanus Immunization")).toBeInTheDocument();
  expect(screen.getByText("HPV; missed: OPV 1")).toBeInTheDocument();
  expect(screen.getByText("2026-09-10")).toBeInTheDocument();
  expect(screen.queryByText(/TETANUS_VACCINE_|IMMUNIZATION_AT_|ROUTINE_VACCINE_TYPE_/)).toBeNull();

  fireEvent.change(container.querySelector('input[placeholder="Search"]'), {
    target: { value: "OPV" },
  });
  await waitFor(() => expect(screen.queryByText("Td2")).not.toBeInTheDocument());
  expect(screen.getByText("HPV; missed: OPV 1")).toBeInTheDocument();
});

it("keeps the delete dialog open with Deleting... until the delete finishes", async () => {
  const put = deferred();
  axios.put.mockReturnValue(put.promise);
  renderHistory();
  await screen.findByText("Td2");
  fireEvent.click(screen.getAllByText("Delete")[0]);
  await screen.findByText(/Are you Sure you want to delete/);
  expect(screen.getByText("Tetanus Immunization", { selector: "b" })).toBeInTheDocument();

  fireEvent.click(screen.getByRole("button", { name: "Yes" }));

  expect(await screen.findByRole("button", { name: "Deleting..." })).toBeDisabled();
  expect(axios.put).toHaveBeenCalledWith(
    expect.stringContaining("immunization/3/archive"),
    null,
    expect.anything()
  );

  put.resolve({ data: "Immunization deleted successfully." });
  await waitFor(() =>
    expect(screen.queryByText(/Are you Sure you want to delete/)).not.toBeInTheDocument()
  );
  expect(toast.success).toHaveBeenCalledWith("Immunization deleted successfully.");
});
