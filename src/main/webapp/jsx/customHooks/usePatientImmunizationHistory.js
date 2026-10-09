import { useQuery } from "react-query";
import { fetchPatientVaccinationHistory } from "../services/fetchPatientVaccinationHistory";
import { getPatientImmunizationHistoryKey } from "../utils/queryKeys";

// Large enough to hold any one patient's records in a single page.
const HISTORY_PAGE_SIZE = 1000;

// Every active immunization record of a patient, newest first. Shared by the
// history views and the forms so they all see the same records.
export const usePatientImmunizationHistory = (patientId) => {
  const { data, isLoading } = useQuery(
    [getPatientImmunizationHistoryKey, patientId],
    () =>
      fetchPatientVaccinationHistory({ id: patientId, page: 0, pageSize: HISTORY_PAGE_SIZE }),
    { enabled: !!patientId }
  );

  return { records: data?.content || [], isLoading };
};
