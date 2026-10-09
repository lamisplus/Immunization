import { fetchCodesets } from "../services/fetchCodeset";
import { LEGACY_ROUTINE_CODESET, ROUTINE_SCHEDULE } from "./immunizationSchedule";

export const routineVaccineCatalogKey = ["ROUTINE_VACCINE_CATALOG"];

// Vaccines are the same across codesets when their names match, e.g. the
// legacy ROUTINE_VACCINE_TYPE_OPV_2 and the staged IMMUNIZATION_AT_10_WEEKS_OPV_2.
const nameKey = (display) => (display || "").trim().replace(/\s+/g, " ").toLowerCase();

const toVaccine = (codeset, stageIndex) => ({
  code: codeset.code,
  display: codeset.display,
  stageIndex,
});

// stageCodesets[i] holds the codeset rows for ROUTINE_SCHEDULE[i].
export const buildRoutineVaccineCatalog = (stageCodesets, legacyCodesets) => {
  const stages = ROUTINE_SCHEDULE.map((stage, index) => ({
    ...stage,
    index,
    vaccines: (stageCodesets[index] || []).map((row) => toVaccine(row, index)),
  }));

  const byCode = new Map();
  const byName = new Map();
  stages.forEach((stage) =>
    stage.vaccines.forEach((vaccine) => {
      byCode.set(vaccine.code, vaccine);
      if (!byName.has(nameKey(vaccine.display))) byName.set(nameKey(vaccine.display), vaccine);
    })
  );
  (legacyCodesets || []).forEach((row) => {
    if (byCode.has(row.code)) return;
    const current = byName.get(nameKey(row.display));
    byCode.set(row.code, current ? { ...current, legacyCode: row.code } : toVaccine(row, -1));
  });

  return { stages, byCode };
};

export const fetchRoutineVaccineCatalog = async () => {
  const [stageCodesets, legacyCodesets] = await Promise.all([
    Promise.all(ROUTINE_SCHEDULE.map((stage) => fetchCodesets(stage.codeset))),
    fetchCodesets(LEGACY_ROUTINE_CODESET),
  ]);
  return buildRoutineVaccineCatalog(stageCodesets, legacyCodesets);
};

export const getVaccineName = (catalog, code) => catalog?.byCode?.get(code)?.display || code;

// The current staged code for any known code (legacy codes map to the
// staged vaccine with the same name); unknown codes pass through.
export const toCurrentCode = (catalog, code) => catalog?.byCode?.get(code)?.code || code;

// Identity used to compare vaccines across codesets.
export const vaccineIdentity = (catalog, code) => {
  const vaccine = catalog?.byCode?.get(code);
  return vaccine ? `${vaccine.stageIndex}:${nameKey(vaccine.display)}` : `code:${code}`;
};
