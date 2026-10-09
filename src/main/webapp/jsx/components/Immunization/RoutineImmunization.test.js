import React from "react";
import axios from "axios";
import { screen, fireEvent, waitFor, within } from "@testing-library/react";
import { toast } from "react-toastify";
import CreateRoutineImmunization from "./CreateRoutineImmunization";
import UpdateRoutineImmunization from "./UpdateRoutineImmunization";
import {
  renderWithProviders,
  deferred,
  springError,
  routeGet,
  codesetRoutes,
  patient,
} from "../../testUtils";

jest.mock("axios");

const infant = { ...patient, id: 501, dateOfBirth: "2026-01-01" }; // female
const teenBoy = {
  ...patient,
  id: 29270,
  dateOfBirth: "2013-07-06",
  gender: { id: 1, display: "Male" },
};

const historyRoute = (records) => ({ "immunization/history/": { content: records } });

let setActiveContent;
beforeEach(() => {
  jest.clearAllMocks();
  jest.spyOn(toast, "success").mockImplementation(() => {});
  jest.spyOn(toast, "error").mockImplementation(() => {});
  setActiveContent = jest.fn();
});

const mockGet = (extra = {}) =>
  axios.get.mockImplementation(routeGet({ ...codesetRoutes, ...historyRoute([]), ...extra }));

const button = (name) => screen.getByRole("button", { name });
const listboxButtons = (container) =>
  Array.from(container.querySelectorAll('[aria-haspopup="listbox"]'));

// Opens the n-th multi-select, returns its option labels, closes it again.
const optionsOf = async (container, index) => {
  fireEvent.mouseDown(listboxButtons(container)[index]);
  const listbox = await screen.findByRole("listbox");
  const labels = within(listbox).getAllByRole("option").map((o) => o.textContent);
  fireEvent.keyDown(listbox, { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
  return labels;
};

const pick = async (container, index, labels) => {
  fireEvent.mouseDown(listboxButtons(container)[index]);
  const listbox = await screen.findByRole("listbox");
  labels.forEach((label) => fireEvent.click(within(listbox).getByText(label)));
  fireEvent.keyDown(listbox, { key: "Escape" });
  await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());
};

const set = (container, name, value) =>
  fireEvent.change(container.querySelector(`#${name}`), { target: { name, value } });

const renderCreate = (patientObj) =>
  renderWithProviders(
    <CreateRoutineImmunization
      patientObj={patientObj}
      activeContent={{ route: "routine-immunization-patient", actionType: "create" }}
      setActiveContent={setActiveContent}
    />
  );

const catalogLoaded = () =>
  waitFor(() => expect(screen.queryByText(/Loading vaccine/)).not.toBeInTheDocument());

describe("CreateRoutineImmunization: saving", () => {
  it("keeps the button on Save while the vaccine list is still loading", async () => {
    const hpv = deferred();
    mockGet({ "application-codesets/v2/IMMUNIZATION_VACCINE_AT_9 YEARS": () => hpv.promise });
    renderCreate(patient);

    await screen.findByText(/Loading vaccine/);
    expect(button(/sav/i)).toHaveTextContent(/^Save$/);
    expect(button(/sav/i)).toBeEnabled();
    hpv.resolve({ data: [] });
  });

  it("shows Saving... only while the save is in flight, then reports a failure", async () => {
    mockGet();
    const post = deferred();
    axios.post.mockReturnValue(post.promise);
    const { container } = renderCreate(patient);
    await catalogLoaded();
    set(container, "vaccinationDate", "2026-10-01");
    await pick(container, 0, ["HPV"]);
    set(container, "vaccineDetail", "left arm");
    set(container, "missedVaccine", "no");

    fireEvent.click(button(/sav/i));
    await waitFor(() => expect(button(/sav/i)).toHaveTextContent("Saving..."));
    expect(button(/sav/i)).toBeDisabled();

    post.reject(springError(500, "Internal Server Error"));
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "Routine Immunization could not be saved: Internal Server Error"
      )
    );
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(setActiveContent).not.toHaveBeenCalled();
    await waitFor(() => expect(button(/sav/i)).toHaveTextContent(/^Save$/));
  });

  it("saves the staged codes and an empty missed list when nothing was missed", async () => {
    mockGet();
    axios.post.mockResolvedValue({ data: { id: 1 } });
    const { container } = renderCreate(patient);
    await catalogLoaded();
    set(container, "vaccinationDate", "2026-10-01");
    await pick(container, 0, ["HPV"]);
    set(container, "vaccineDetail", "left arm");
    set(container, "missedVaccine", "no");

    fireEvent.click(button(/sav/i));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("Routine Immunization saved successfully.")
    );
    expect(axios.post.mock.calls[0][1]).toMatchObject({
      immunizationType: "ROUTINE_IMMUNIZATION",
      patientId: patient.id,
      vaccinationDate: "2026-10-01",
      uniqueImmunizationData: {
        vaccineType: ["IMMUNIZATION_AT_9_YEARS_HPV"],
        missedVaccine: "no",
        missedVaccineType: [],
      },
    });
  });
});

describe("CreateRoutineImmunization: schedule-aware vaccines", () => {
  it("offers the stage due on the vaccination date and follows date changes", async () => {
    mockGet();
    const { container } = renderCreate(infant);
    await catalogLoaded();

    set(container, "vaccinationDate", "2026-03-12");
    expect(screen.getByText("Schedule stage on this date: 10 weeks")).toBeInTheDocument();
    expect(await optionsOf(container, 0)).toEqual([
      "OPV 2",
      "Pentavalent (DPT, Hep B and Hib) 2",
      "Pnemococal Conjugate Vaccine 2",
      "Rota 2",
    ]);
    await pick(container, 0, ["OPV 2"]);
    expect(listboxButtons(container)[0]).toHaveTextContent("OPV 2");

    // Back-dated to when the child was 19 days old.
    set(container, "vaccinationDate", "2026-01-20");
    expect(screen.getByText("Schedule stage on this date: At birth")).toBeInTheDocument();
    expect(await optionsOf(container, 0)).toEqual(["BCG", "Hep B birth", "OPVD"]);
    expect(listboxButtons(container)[0]).toHaveTextContent("Select vaccine type");
  });

  it("offers as missed only earlier-stage vaccines not yet received, and saves several", async () => {
    mockGet(
      historyRoute([
        {
          id: 40,
          immunizationType: "ROUTINE_IMMUNIZATION",
          vaccinationDate: "2026-01-02",
          uniqueImmunizationData: {
            vaccineType: "ROUTINE_VACCINE_TYPE_BCG",
            missedVaccine: "yes",
            missedVaccineType: ["IMMUNIZATION_AT_BIRTH_OPVD"],
          },
        },
      ])
    );
    axios.post.mockResolvedValue({ data: { id: 41 } });
    const { container } = renderCreate(infant);
    await catalogLoaded();
    set(container, "vaccinationDate", "2026-03-12");
    await pick(container, 0, ["OPV 2", "Rota 2"]);
    set(container, "vaccineDetail", "catch-up visit");
    set(container, "missedVaccine", "yes");

    expect(await optionsOf(container, 1)).toEqual([
      "Hep B birth",
      "OPV 1",
      "Pentavalent (DPT, Hep B and Hib) 1",
      "Pnemococal Conjugate Vaccine 1",
      "Rota 1",
    ]);
    await pick(container, 1, ["OPV 1", "Rota 1"]);
    fireEvent.click(button(/sav/i));

    await waitFor(() => expect(axios.post).toHaveBeenCalled());
    expect(axios.post.mock.calls[0][1].uniqueImmunizationData).toMatchObject({
      vaccineType: ["IMMUNIZATION_AT_10_WEEKS_OPV_2", "IMMUNIZATION_AT_10_WEEKS_ROTA_2"],
      missedVaccine: "yes",
      missedVaccineType: ["IMMUNIZATION_AT_6_WEEKS_OPV_1", "IMMUNIZATION_AT_6_WEEKS_ROTA_1"],
    });
  });

  it("requires a missed vaccine when 'Yes' is chosen", async () => {
    mockGet();
    const { container } = renderCreate(infant);
    await catalogLoaded();
    set(container, "vaccinationDate", "2026-03-12");
    await pick(container, 0, ["OPV 2"]);
    set(container, "vaccineDetail", "x");
    set(container, "missedVaccine", "yes");

    fireEvent.click(button(/sav/i));

    expect(await screen.findByText("Select at least one missed vaccine")).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });

  it("blocks 'Yes' when nothing earlier is outstanding", async () => {
    mockGet();
    const { container } = renderCreate(infant);
    await catalogLoaded();
    set(container, "vaccinationDate", "2026-01-20");

    expect(screen.getByRole("option", { name: "Yes" })).toBeDisabled();
    expect(
      screen.getByText("No vaccine from an earlier schedule stage is outstanding for this patient.")
    ).toBeInTheDocument();
  });

  it("never offers HPV to a male patient, as scheduled or missed", async () => {
    mockGet();
    const { container } = renderCreate(teenBoy);
    await catalogLoaded();
    set(container, "vaccinationDate", "2026-09-16");
    set(container, "missedVaccine", "yes");

    fireEvent.mouseDown(listboxButtons(container)[0]);
    const listbox = await screen.findByRole("listbox");
    expect(within(listbox).queryAllByRole("option")).toHaveLength(0);
    fireEvent.keyDown(listbox, { key: "Escape" });
    await waitFor(() => expect(screen.queryByRole("listbox")).not.toBeInTheDocument());

    const missed = await optionsOf(container, 1);
    expect(missed).not.toContain("HPV");
    expect(missed).toHaveLength(21);
  });

  it("rejects a vaccination date before the date of birth", async () => {
    mockGet();
    const { container } = renderCreate(infant);
    await catalogLoaded();
    set(container, "vaccinationDate", "2025-12-31");
    fireEvent.click(button(/sav/i));

    expect(
      await screen.findByText("Vaccination date cannot be before the date of birth")
    ).toBeInTheDocument();
    expect(axios.post).not.toHaveBeenCalled();
  });
});

describe("UpdateRoutineImmunization", () => {
  // As stored for patient 29270 on the dev server: single-string vaccine
  // and a legacy-catalog missed vaccine.
  const legacyRecord = {
    id: 1,
    immunizationType: "ROUTINE_IMMUNIZATION",
    vaccinationDate: "2026-09-16",
    uniqueImmunizationData: {
      vaccineType: "IMMUNIZATION_AT_9_YEARS_HPV",
      vaccineDetail: "hello edited",
      missedVaccine: "yes",
      missedVaccineType: "ROUTINE_VACCINE_TYPE_PNEMOCOCAL_CONJUGATE_VACCINE_2",
      vaccinationDate: "2026-09-16",
    },
  };

  const renderUpdate = (disableInputs) =>
    renderWithProviders(
      <UpdateRoutineImmunization
        patientObj={teenBoy}
        activeContent={{
          route: "routine-immunization-patient",
          actionType: disableInputs ? "view" : "update",
          id: 1,
        }}
        setActiveContent={setActiveContent}
        disableInputs={disableInputs}
      />
    );

  it("shows an old record's vaccines by name instead of blanks", async () => {
    mockGet({ "immunization/1": legacyRecord });
    const { container } = renderUpdate(true);

    await waitFor(() => expect(container.querySelector("#vaccineDetail")).toHaveValue("hello edited"));
    const [vaccine, missed] = listboxButtons(container);
    expect(vaccine).toHaveTextContent("HPV");
    expect(missed).toHaveTextContent("Pnemococal Conjugate Vaccine 2");
    expect(screen.getByText("Routine Immunization (view)")).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /updat/i })).not.toBeInTheDocument();
  });

  it("keeps the button on Update while the vaccine list is still loading", async () => {
    const hpv = deferred();
    mockGet({
      "application-codesets/v2/IMMUNIZATION_VACCINE_AT_9 YEARS": () => hpv.promise,
      "immunization/1": legacyRecord,
    });
    renderUpdate(false);

    await screen.findByText(/Loading vaccine/);
    expect(button(/updat/i)).toHaveTextContent(/^Update$/);
    hpv.resolve({ data: [] });
  });

  it("stores current codes and lists when an old record is updated", async () => {
    mockGet({ "immunization/1": legacyRecord });
    axios.put.mockResolvedValue({ data: { id: 1 } });
    const { container } = renderUpdate(false);
    await waitFor(() => expect(container.querySelector("#vaccineDetail")).toHaveValue("hello edited"));

    fireEvent.click(button(/updat/i));

    await waitFor(() =>
      expect(toast.success).toHaveBeenCalledWith("Routine Immunization updated successfully.")
    );
    const [url, body] = axios.put.mock.calls[0];
    expect(url).toContain("immunization/1");
    expect(body.uniqueImmunizationData).toMatchObject({
      vaccineType: ["IMMUNIZATION_AT_9_YEARS_HPV"],
      missedVaccine: "yes",
      missedVaccineType: ["IMMUNIZATION_AT_10_WEEKS_PNEMOCOCAL_CONJUGATE_VACCINE_2"],
    });
  });

  it("shows Updating... while the update is in flight, then reports a failure", async () => {
    mockGet({ "immunization/1": legacyRecord });
    axios.put.mockRejectedValue(springError(500, "Internal Server Error"));
    const { container } = renderUpdate(false);
    await waitFor(() => expect(container.querySelector("#vaccineDetail")).toHaveValue("hello edited"));

    fireEvent.click(button(/updat/i));
    await waitFor(() => expect(button(/updat/i)).toHaveTextContent("Updating..."));
    expect(button(/updat/i)).toBeDisabled();

    await waitFor(
      () =>
        expect(toast.error).toHaveBeenCalledWith(
          "Routine Immunization could not be updated: Internal Server Error"
        ),
      { timeout: 8000 }
    );
    expect(setActiveContent).not.toHaveBeenCalled();
    await waitFor(() => expect(button(/updat/i)).toHaveTextContent(/^Update$/));
  }, 30000);
});
