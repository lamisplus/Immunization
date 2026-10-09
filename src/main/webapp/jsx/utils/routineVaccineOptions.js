import { getScheduleStageIndex, toCodeList } from "./immunizationSchedule";
import { toCurrentCode, vaccineIdentity, getVaccineName } from "./routineVaccineCatalog";

const isHpv = (vaccine) =>
  /hpv/i.test(vaccine?.code || "") || /hpv/i.test(vaccine?.display || "");

const unique = (vaccines, catalog) => {
  const seen = new Set();
  return vaccines.filter((vaccine) => {
    const id = vaccineIdentity(catalog, vaccine.code);
    if (seen.has(id)) return false;
    seen.add(id);
    return true;
  });
};

// Saved codes must stay visible even when they are outside today's options
// (other stage, legacy code, or since-removed codeset entry).
const withSaved = (vaccines, savedCodes, catalog) => {
  const known = new Set(vaccines.map((v) => vaccineIdentity(catalog, v.code)));
  const extra = toCodeList(savedCodes)
    .filter((code) => !known.has(vaccineIdentity(catalog, code)))
    .map((code) => ({ code, display: getVaccineName(catalog, code), stageIndex: -1 }));
  return [...vaccines, ...extra];
};

// Codes of every vaccine the patient has received in routine records:
// those given as scheduled and those given as missed (catch-up) doses.
export const getReceivedVaccineCodes = (history, excludeRecordId) =>
  (history || [])
    .filter(
      (record) =>
        record?.immunizationType === "ROUTINE_IMMUNIZATION" && record?.id !== excludeRecordId
    )
    .flatMap((record) => [
      ...toCodeList(record?.uniqueImmunizationData?.vaccineType),
      ...toCodeList(record?.uniqueImmunizationData?.missedVaccineType),
    ]);

// Vaccines offered as "Type of vaccine": the stage the patient is in on the
// vaccination date. With no usable birth date the whole schedule is offered.
export const getRoutineVaccineOptions = ({
  catalog,
  dateOfBirth,
  vaccinationDate,
  isMale,
  savedCodes,
}) => {
  if (!catalog) return { stageIndex: -1, stage: null, vaccines: [] };
  const stageIndex = getScheduleStageIndex(dateOfBirth, vaccinationDate);
  const pool =
    stageIndex === -1
      ? catalog.stages.flatMap((stage) => stage.vaccines)
      : catalog.stages[stageIndex].vaccines;
  const vaccines = unique(pool, catalog).filter((v) => !(isMale && isHpv(v)));
  return {
    stageIndex,
    stage: stageIndex === -1 ? null : catalog.stages[stageIndex],
    vaccines: withSaved(vaccines, savedCodes, catalog),
  };
};

// Vaccines offered as missed: everything due at earlier stages that the
// patient has not received, is not getting as a scheduled dose today, and
// (for males) is not HPV.
export const getMissedVaccineOptions = ({
  catalog,
  dateOfBirth,
  vaccinationDate,
  isMale,
  receivedCodes,
  selectedCodes,
  savedCodes,
}) => {
  if (!catalog) return [];
  const stageIndex = getScheduleStageIndex(dateOfBirth, vaccinationDate);
  const excluded = new Set(
    [...toCodeList(receivedCodes), ...toCodeList(selectedCodes)].map((code) =>
      vaccineIdentity(catalog, code)
    )
  );
  const earlier = stageIndex <= 0 ? [] : catalog.stages.slice(0, stageIndex).flatMap((s) => s.vaccines);
  const vaccines = unique(earlier, catalog).filter(
    (v) => !excluded.has(vaccineIdentity(catalog, v.code)) && !(isMale && isHpv(v))
  );
  return withSaved(vaccines, savedCodes, catalog);
};

// Saved codes rewritten to current staged codes so updated records use the
// same codes as new ones.
export const toCurrentCodes = (catalog, value) =>
  toCodeList(value).map((code) => toCurrentCode(catalog, code));
