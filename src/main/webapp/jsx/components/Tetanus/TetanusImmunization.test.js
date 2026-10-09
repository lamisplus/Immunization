import React from "react";
import axios from "axios";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { toast } from "react-toastify";
import CreateTetanusImmunization from "./CreateTetanusImmunization";
import UpdateTetanusImmunization from "./UpdateTetanusImmunization";
import {
  renderWithProviders,
  deferred,
  springError,
  routeGet,
  patient,
} from "../../testUtils";

jest.mock("axios");

const tetanusVaccines = [
  { id: 1268, code: "TETANUS_VACCINE_TD1", display: "Td1" },
  { id: 1269, code: "TETANUS_VACCINE_TD2", display: "Td2" },
];

let setActiveContent;
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(toast, "success").mockImplementation(() => {});
  jest.spyOn(toast, "error").mockImplementation(() => {});
  setActiveContent = jest.fn();
  axios.get.mockImplementation(
    routeGet({
      "application-codesets/v2/TETANUS_VACCINE": tetanusVaccines,
      "immunization/77": {
        id: 77,
        immunizationType: "TETANUS_IMMUNIZATION",
        vaccinationDate: "2026-09-16",
        uniqueImmunizationData: { vaccineType: "TETANUS_VACCINE_TD2", vaccinationDate: "2026-09-16" },
      },
    })
  );
});

const fillCreateForm = async (container) => {
  await screen.findByText("Td1");
  fireEvent.change(container.querySelector("#vaccineType"), {
    target: { name: "vaccineType", value: "TETANUS_VACCINE_TD1" },
  });
  fireEvent.change(container.querySelector("#vaccinationDate"), {
    target: { name: "vaccinationDate", value: "2026-10-01" },
  });
};

const saveButton = () => screen.getByRole("button", { name: /sav/i });

describe("CreateTetanusImmunization", () => {
  const renderCreate = () =>
    renderWithProviders(
      <CreateTetanusImmunization
        patientObj={patient}
        activeContent={{ route: "tetanus-patient", actionType: "create" }}
        setActiveContent={setActiveContent}
      />
    );

  it("shows Saving... and disables the button only while the save is in flight", async () => {
    const post = deferred();
    axios.post.mockReturnValue(post.promise);
    const { container } = renderCreate();
    await fillCreateForm(container);

    expect(saveButton()).toHaveTextContent(/^Save$/);
    fireEvent.click(saveButton());

    await waitFor(() => expect(saveButton()).toHaveTextContent("Saving..."));
    expect(saveButton()).toBeDisabled();

    post.resolve({ data: { id: 1 } });
    await waitFor(() => expect(toast.success).toHaveBeenCalled());
  });

  it("tells the user when the save fails, with the server's reason, and does not retry the POST", async () => {
    axios.post.mockRejectedValue(springError(500, "Internal Server Error"));
    const { container } = renderCreate();
    await fillCreateForm(container);

    fireEvent.click(saveButton());

    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Tetanus Immunization could not be saved: Internal Server Error"
      )
    );
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(toast.success).not.toHaveBeenCalled();
    expect(setActiveContent).not.toHaveBeenCalled();
    await waitFor(() => expect(saveButton()).toHaveTextContent(/^Save$/));
    expect(saveButton()).toBeEnabled();
  });

  it("names the right immunization type when the save succeeds", async () => {
    axios.post.mockResolvedValue({ data: { id: 1 } });
    const { container } = renderCreate();
    await fillCreateForm(container);

    fireEvent.click(saveButton());

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("Tetanus Immunization saved successfully.")
    );
    expect(axios.post.mock.calls[0][1]).toMatchObject({
      immunizationType: "TETANUS_IMMUNIZATION",
      patientId: patient.id,
      vaccinationDate: "2026-10-01",
    });
    expect(setActiveContent).toHaveBeenCalledWith(
      expect.objectContaining({ route: "patient-vaccination-history" })
    );
  });

  it("does not accept the 'Select' placeholder as a vaccine", async () => {
    const { container } = renderCreate();
    await fillCreateForm(container);
    // Pick the placeholder option exactly as the browser reports it.
    const placeholder = screen.getByRole("option", { name: "Select" });
    fireEvent.change(container.querySelector("#vaccineType"), {
      target: { name: "vaccineType", value: placeholder.value },
    });

    fireEvent.click(saveButton());

    await screen.findByText("This field is required");
    expect(axios.post).not.toHaveBeenCalled();
  });
});

describe("UpdateTetanusImmunization", () => {
  it("tells the user when the update fails", async () => {
    axios.put.mockRejectedValue(springError(500, "Internal Server Error"));
    renderWithProviders(
      <UpdateTetanusImmunization
        patientObj={patient}
        activeContent={{ route: "tetanus-patient", actionType: "update", id: 77 }}
        setActiveContent={setActiveContent}
        disableInputs={false}
      />
    );
    await waitFor(() =>
      expect(document.querySelector("#vaccinationDate")).toHaveValue("2026-09-16")
    );

    fireEvent.click(screen.getByRole("button", { name: /updat/i }));

    // PUT is idempotent and keeps the app-wide retry policy (2 retries, ~3s).
    await waitFor(
      () =>
        expect(toast.error).toHaveBeenCalledWith(
          "Tetanus Immunization could not be updated: Internal Server Error"
        ),
      { timeout: 8000 }
    );
    expect(setActiveContent).not.toHaveBeenCalled();
  }, 15000);
});
