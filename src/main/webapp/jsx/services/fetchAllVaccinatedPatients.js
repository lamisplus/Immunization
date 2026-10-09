import axios from "axios";
import { token, url as baseUrl } from "../../api";

// One row per vaccinated patient (their latest record), paged and searched
// on the server.
export const fetchAllVaccinatedPatients = async ({ page, pageSize, search }) => {
  const response = await axios.get(
    `${baseUrl}immunization/patients?page=${page}&size=${pageSize}&search=${encodeURIComponent(search || "")}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response?.data;
};
