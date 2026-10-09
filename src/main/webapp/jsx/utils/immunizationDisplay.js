import { toCodeList } from "./immunizationSchedule";
import { getVaccineName } from "./routineVaccineCatalog";
import { getImmunizationLabel } from "./mutationFeedback";

const nameFrom = (codesets, code) => {
  const row = (codesets || []).find((item) => item?.code === code);
  return row?.display || row?.name || code;
};

// Human-readable summary of an immunization record. Codes are resolved
// through the routine catalog (current and legacy codes), the tetanus codeset
// or the COVID vaccine list; unknown codes are shown as stored.
export const describeImmunization = (record, { routineCatalog, tetanusVaccines, covidVaccines } = {}) => {
  const data = record?.uniqueImmunizationData || {};
  const type = record?.immunizationType;
  const resolve = (code) => {
    if (type === "ROUTINE_IMMUNIZATION") return getVaccineName(routineCatalog, code);
    if (type === "TETANUS_IMMUNIZATION") return nameFrom(tetanusVaccines, code);
    if (type === "COVID_IMMUNIZATION") return nameFrom(covidVaccines, code);
    return code;
  };
  const missedCodes = data.missedVaccine === "yes" ? toCodeList(data.missedVaccineType) : [];

  return {
    typeLabel: getImmunizationLabel(type),
    vaccines: toCodeList(data.vaccineType).map(resolve).join(", "),
    missedVaccines: missedCodes.map(resolve).join(", "),
    dosage: type === "COVID_IMMUNIZATION" ? data.vaccinationDosage || "" : "",
  };
};
