import React from "react";
import axios from "axios";
import moment from "moment";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import RecentActivities from "./RecentActivities";
import {
  renderWithProviders,
  deferred,
  springError,
  routeGet,
  codesetRoutes,
  patient,
} from "../../testUtils";

jest.mock("axios");

const history = {
  content: [
    {
      id: 2,
      patientId: patient.id,
      immunizationType: "ROUTINE_IMMUNIZATION",
      vaccinationDate: "2020-03-01",
      uniqueImmunizationData: {
        vaccineType: "IMMUNIZATION_AT_9_YEARS_HPV",
        missedVaccine: "yes",
        missedVaccineType: "ROUTINE_VACCINE_TYPE_PNEMOCOCAL_CONJUGATE_VACCINE_2",
      },
    },
    {
      id: 3,
      patientId: patient.id,
      immunizationType: "TETANUS_IMMUNIZATION",
      vaccinationDate: "2019-05-01",
      uniqueImmunizationData: { vaccineType: "TETANUS_VACCINE_TD2" },
    },
  ],
};

const realNow = moment.now;
let setActiveContent;
beforeEach(() => {
  jest.clearAllMocks();
  moment.now = () => new Date(2026, 9, 9).getTime(); // "today" = 9 Oct 2026
  jest.spyOn(toast, "success").mockImplementation(() => {});
  jest.spyOn(toast, "error").mockImplementation(() => {});
  setActiveContent = jest.fn();
  axios.get.mockImplementation(
    routeGet({
      ...codesetRoutes,
      "immunization/history/": history,
      "covid/codeset": [],
    })
  );
});
afterEach(() => {
  moment.now = realNow;
});

const renderActivities = () =>
  renderWithProviders(
    <RecentActivities
      patientObj={patient}
      activeContent={{ route: "patient-vaccination-history" }}
      setActiveContent={setActiveContent}
    />
  );

const openDeleteDialog = async (container) => {
  await screen.findAllByText(/Vaccination Date/);
  fireEvent.click(container.querySelector(".dropdown-toggle"));
  fireEvent.click(await screen.findByText("Delete"));
  await screen.findByText(/Are you Sure you want to delete/);
};

it("shows the patient's age today and at the vaccination date from the API's ISO birth date", async () => {
  renderActivities();
  // Born 2010-01-30: 16 on 9 Oct 2026, 10 on 1 Mar 2020.
  expect(
    await screen.findByText(/Age now: 16 year\(s\) \| Age at vaccination: 10 year\(s\)/)
  ).toBeInTheDocument();
});

it("shows readable types and vaccine names, including legacy codes and missed doses", async () => {
  renderActivities();

  expect(await screen.findByText("Vaccine(s): HPV")).toBeInTheDocument();
  expect(screen.getByText("Routine Immunization")).toBeInTheDocument();
  expect(
    screen.getByText(/Missed vaccine\(s\) given:\s*Pnemococal Conjugate Vaccine 2/)
  ).toBeInTheDocument();
  expect(await screen.findByText("Vaccine(s): Td2")).toBeInTheDocument();
  expect(screen.getByText("Tetanus Immunization")).toBeInTheDocument();
  expect(screen.queryByText(/IMMUNIZATION_AT_|ROUTINE_VACCINE_TYPE_|TETANUS_VACCINE_|_IMMUNIZATION/)).toBeNull();
});

it("keeps the delete dialog open with Deleting... until the delete finishes", async () => {
  const put = deferred();
  axios.put.mockReturnValue(put.promise);
  const { container } = renderActivities();
  await openDeleteDialog(container);

  fireEvent.click(screen.getByRole("button", { name: "Yes" }));

  const deleting = await screen.findByRole("button", { name: "Deleting..." });
  expect(deleting).toBeDisabled();
  expect(screen.getByRole("button", { name: "No" })).toBeDisabled();

  put.resolve({ data: "Immunization deleted successfully." });
  await waitFor(() =>
    expect(toast.success).toHaveBeenCalledWith("Immunization deleted successfully.")
  );
  await waitFor(() =>
    expect(screen.queryByText(/Are you Sure you want to delete/)).not.toBeInTheDocument()
  );
});

it("tells the user when the delete fails", async () => {
  axios.put.mockRejectedValue(springError(500, "Internal Server Error"));
  const { container } = renderActivities();
  await openDeleteDialog(container);

  fireEvent.click(screen.getByRole("button", { name: "Yes" }));

  await waitFor(
    () =>
      expect(toast.error).toHaveBeenCalledWith(
        "Immunization could not be deleted: Internal Server Error"
      ),
    { timeout: 8000 }
  );
  expect(toast.success).not.toHaveBeenCalled();
}, 15000);
