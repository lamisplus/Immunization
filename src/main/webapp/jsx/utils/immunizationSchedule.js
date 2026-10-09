import moment from "moment";
import { parseDate } from "./calculateAge";

// National routine schedule, in order. Each stage starts at minAge and lasts
// until the next one; the codeset lists the vaccines due at that stage.
export const ROUTINE_SCHEDULE = [
  { codeset: "IMMUNIZATION_VACCINE_AT_BIRTH", label: "At birth", minAge: [0, "weeks"] },
  { codeset: "IMMUNIZATION_VACCINE_AT_6 WEEKS", label: "6 weeks", minAge: [6, "weeks"] },
  { codeset: "IMMUNIZATION_VACCINE_AT_10 WEEKS", label: "10 weeks", minAge: [10, "weeks"] },
  { codeset: "IMMUNIZATION_VACCINE_AT_14 WEEKS", label: "14 weeks", minAge: [14, "weeks"] },
  { codeset: "IMMUNIZATION_VACCINE_AT_6 MONTHS", label: "6 months", minAge: [6, "months"] },
  { codeset: "IMMUNIZATION_VACCINE_AT_9 MONTHS", label: "9 months", minAge: [9, "months"] },
  { codeset: "IMMUNIZATION_VACCINE_AT_15 MONTHS", label: "15 months", minAge: [15, "months"] },
  { codeset: "IMMUNIZATION_VACCINE_AT_9 YEARS", label: "9 years", minAge: [9, "years"] },
];

// Flat catalog used by records saved before the age-staged codesets.
export const LEGACY_ROUTINE_CODESET = "ROUTINE_IMMUNIZATION_VACCINE_TYPE";

// Index into ROUTINE_SCHEDULE of the stage the patient is in on atDate
// (today when omitted), or -1 when the birth date or atDate is unknown or
// atDate is before birth.
export const getScheduleStageIndex = (dob, atDate) => {
  const birthDate = parseDate(dob);
  const onDate = atDate ? parseDate(atDate) : moment();
  if (!birthDate || !onDate || onDate.isBefore(birthDate, "day")) return -1;

  let stageIndex = 0;
  ROUTINE_SCHEDULE.forEach((stage, index) => {
    const [amount, unit] = stage.minAge;
    if (!onDate.isBefore(birthDate.clone().add(amount, unit), "day")) {
      stageIndex = index;
    }
  });
  return stageIndex;
};

// Saved vaccine fields hold a code, a list of codes, or nothing (records
// made before multi-select stored a single string).
export const toCodeList = (value) => {
  if (Array.isArray(value)) return value.filter(Boolean);
  return value ? [value] : [];
};
