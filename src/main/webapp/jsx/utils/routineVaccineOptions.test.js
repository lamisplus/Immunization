import { getScheduleStageIndex, ROUTINE_SCHEDULE, toCodeList } from "./immunizationSchedule";
import {
  buildRoutineVaccineCatalog,
  getVaccineName,
  toCurrentCode,
} from "./routineVaccineCatalog";
import {
  getMissedVaccineOptions,
  getReceivedVaccineCodes,
  getRoutineVaccineOptions,
  toCurrentCodes,
} from "./routineVaccineOptions";
import { routineCodesets } from "../testUtils";

const catalog = buildRoutineVaccineCatalog(
  ROUTINE_SCHEDULE.map((stage) => routineCodesets[stage.codeset]),
  routineCodesets.ROUTINE_IMMUNIZATION_VACCINE_TYPE
);
const names = (vaccines) => vaccines.map((v) => v.display);

describe("getScheduleStageIndex (age measured at the vaccination date)", () => {
  const stage = (dob, date) => ROUTINE_SCHEDULE[getScheduleStageIndex(dob, date)]?.label;

  it("places each age in the right stage, at the boundaries", () => {
    expect(stage("2026-01-01", "2026-01-01")).toBe("At birth");
    expect(stage("2026-01-01", "2026-02-11")).toBe("At birth"); // 5w6d
    expect(stage("2026-01-01", "2026-02-12")).toBe("6 weeks");
    expect(stage("2026-01-01", "2026-03-12")).toBe("10 weeks");
    expect(stage("2026-01-01", "2026-04-09")).toBe("14 weeks");
    expect(stage("2026-01-01", "2026-06-30")).toBe("14 weeks");
    expect(stage("2026-01-01", "2026-07-01")).toBe("6 months");
    expect(stage("2026-01-01", "2026-10-01")).toBe("9 months");
    expect(stage("2026-01-01", "2027-04-01")).toBe("15 months");
    expect(stage("2026-01-01", "2034-12-31")).toBe("15 months");
    expect(stage("2026-01-01", "2035-01-01")).toBe("9 years");
  });

  it("uses the vaccination date, not today, so back-dated entries get the stage they happened in", () => {
    // A 16-year-old's visit recorded for when she was 10 weeks old.
    expect(stage("2010-01-30", "2010-04-10")).toBe("10 weeks");
  });

  it("is -1 when the birth date is missing/invalid or the date is before birth", () => {
    expect(getScheduleStageIndex(null, "2026-01-01")).toBe(-1);
    expect(getScheduleStageIndex("not-a-date", "2026-01-01")).toBe(-1);
    expect(getScheduleStageIndex("2026-01-02", "2026-01-01")).toBe(-1);
  });
});

describe("routine vaccine catalog", () => {
  it("names staged and legacy codes, and maps legacy codes to the staged vaccine", () => {
    expect(getVaccineName(catalog, "IMMUNIZATION_AT_9_YEARS_HPV")).toBe("HPV");
    expect(getVaccineName(catalog, "ROUTINE_VACCINE_TYPE_PNEMOCOCAL_CONJUGATE_VACCINE_2")).toBe(
      "Pnemococal Conjugate Vaccine 2"
    );
    expect(toCurrentCode(catalog, "ROUTINE_VACCINE_TYPE_PNEMOCOCAL_CONJUGATE_VACCINE_2")).toBe(
      "IMMUNIZATION_AT_10_WEEKS_PNEMOCOCAL_CONJUGATE_VACCINE_2"
    );
    expect(toCurrentCode(catalog, "ROUTINE_VACCINE_TYPE_MEASLES_1ST_DOSE")).toBe(
      "IMMUNIZATION_AT_9_MONTHS_MEASLES_1ST_DOES"
    );
    expect(getVaccineName(catalog, "SOMETHING_UNKNOWN")).toBe("SOMETHING_UNKNOWN");
    expect(toCurrentCodes(catalog, "ROUTINE_VACCINE_TYPE_BCG")).toEqual(["IMMUNIZATION_AT_BIRTH_BCG"]);
  });

  it("normalizes saved vaccine fields to lists", () => {
    expect(toCodeList("A")).toEqual(["A"]);
    expect(toCodeList(["A", "", null, "B"])).toEqual(["A", "B"]);
    expect(toCodeList(undefined)).toEqual([]);
  });
});

describe("getRoutineVaccineOptions", () => {
  it("offers the stage due on the vaccination date", () => {
    const { stage, vaccines } = getRoutineVaccineOptions({
      catalog,
      dateOfBirth: "2026-01-01",
      vaccinationDate: "2026-03-12",
    });
    expect(stage.label).toBe("10 weeks");
    expect(names(vaccines)).toEqual([
      "OPV 2",
      "Pentavalent (DPT, Hep B and Hib) 2",
      "Pnemococal Conjugate Vaccine 2",
      "Rota 2",
    ]);
  });

  it("hides HPV from male patients only", () => {
    const args = { catalog, dateOfBirth: "2013-07-06", vaccinationDate: "2026-09-16" };
    expect(names(getRoutineVaccineOptions({ ...args, isMale: true }).vaccines)).toEqual([]);
    expect(names(getRoutineVaccineOptions({ ...args, isMale: false }).vaccines)).toEqual(["HPV"]);
  });

  it("keeps saved vaccines listed (and named) even outside the stage", () => {
    const { vaccines } = getRoutineVaccineOptions({
      catalog,
      dateOfBirth: "2013-07-06",
      vaccinationDate: "2026-09-16",
      isMale: true,
      savedCodes: ["IMMUNIZATION_AT_9_YEARS_HPV", "ROUTINE_VACCINE_TYPE_OPV_1"],
    });
    expect(names(vaccines)).toEqual(["HPV", "OPV 1"]);
  });

  it("offers the whole schedule when the birth date is unknown", () => {
    const { stageIndex, vaccines } = getRoutineVaccineOptions({ catalog, dateOfBirth: null });
    expect(stageIndex).toBe(-1);
    expect(vaccines).toHaveLength(22);
  });
});

describe("getMissedVaccineOptions", () => {
  const tenWeekOld = { catalog, dateOfBirth: "2026-01-01", vaccinationDate: "2026-03-12" };

  it("offers every earlier-stage vaccine, never the current stage's", () => {
    expect(names(getMissedVaccineOptions(tenWeekOld))).toEqual([
      "BCG",
      "Hep B birth",
      "OPVD",
      "OPV 1",
      "Pentavalent (DPT, Hep B and Hib) 1",
      "Pnemococal Conjugate Vaccine 1",
      "Rota 1",
    ]);
  });

  it("leaves out vaccines already received, including legacy-coded and catch-up doses", () => {
    const history = [
      {
        id: 1,
        immunizationType: "ROUTINE_IMMUNIZATION",
        uniqueImmunizationData: {
          vaccineType: "ROUTINE_VACCINE_TYPE_BCG", // old single legacy code
          missedVaccineType: "IMMUNIZATION_AT_BIRTH_OPVD", // given as catch-up
        },
      },
      {
        id: 2,
        immunizationType: "ROUTINE_IMMUNIZATION",
        uniqueImmunizationData: { vaccineType: ["IMMUNIZATION_AT_6_WEEKS_ROTA_1"] },
      },
      {
        id: 3,
        immunizationType: "TETANUS_IMMUNIZATION",
        uniqueImmunizationData: { vaccineType: "TETANUS_VACCINE_TD1" },
      },
    ];
    const missed = getMissedVaccineOptions({
      ...tenWeekOld,
      receivedCodes: getReceivedVaccineCodes(history),
    });
    expect(names(missed)).toEqual([
      "Hep B birth",
      "OPV 1",
      "Pentavalent (DPT, Hep B and Hib) 1",
      "Pnemococal Conjugate Vaccine 1",
    ]);
  });

  it("does not count the record being edited as already received", () => {
    const history = [
      {
        id: 7,
        immunizationType: "ROUTINE_IMMUNIZATION",
        uniqueImmunizationData: { missedVaccineType: ["IMMUNIZATION_AT_BIRTH_BCG"] },
      },
    ];
    expect(getReceivedVaccineCodes(history, 7)).toEqual([]);
    expect(getReceivedVaccineCodes(history)).toEqual(["IMMUNIZATION_AT_BIRTH_BCG"]);
  });

  it("is empty at birth and when the birth date is unknown", () => {
    expect(
      getMissedVaccineOptions({ catalog, dateOfBirth: "2026-01-01", vaccinationDate: "2026-01-20" })
    ).toEqual([]);
    expect(getMissedVaccineOptions({ catalog, dateOfBirth: null })).toEqual([]);
  });

  it("never offers HPV to a male as missed", () => {
    // HPV is the last stage, so nothing earlier is HPV; a saved one stays visible.
    const missed = getMissedVaccineOptions({
      catalog,
      dateOfBirth: "2013-07-06",
      vaccinationDate: "2026-09-16",
      isMale: true,
    });
    expect(names(missed)).not.toContain("HPV");
    expect(missed).toHaveLength(21); // every vaccine from birth to 15 months
  });

  it("keeps saved missed vaccines visible even if now received or legacy-coded", () => {
    const missed = getMissedVaccineOptions({
      ...tenWeekOld,
      receivedCodes: ["IMMUNIZATION_AT_BIRTH_BCG"],
      savedCodes: ["ROUTINE_VACCINE_TYPE_BCG"],
    });
    expect(names(missed)).toContain("BCG");
  });
});
