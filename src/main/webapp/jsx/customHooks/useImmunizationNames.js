import { useQuery } from "react-query";
import { fetchCodesets } from "../services/fetchCodeset";
import { fetchCovidVaccines } from "../services/fetchCovidVaccines";
import {
  fetchRoutineVaccineCatalog,
  routineVaccineCatalogKey,
} from "../utils/routineVaccineCatalog";

// The lookups needed to show vaccine names for every immunization type.
// Query keys match the forms', so the data is fetched once and shared.
export const useImmunizationNames = () => {
  const { data: routineCatalog } = useQuery(routineVaccineCatalogKey, fetchRoutineVaccineCatalog);
  const { data: tetanusVaccines } = useQuery(["TETANUS_VACCINE"], () =>
    fetchCodesets("TETANUS_VACCINE")
  );
  const { data: covidVaccines } = useQuery(["COVID_VACCINES"], () => fetchCovidVaccines());

  return { routineCatalog, tetanusVaccines, covidVaccines };
};
