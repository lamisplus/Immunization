import axios from "axios";
import { token, url as baseUrl } from "../../api";

// Spring's Pageable reads `page` (0-based) and `size`.
export const fetchPatientVaccinationHistory = async ({ page, pageSize, id }) => {
  const response = await axios.get(
    `${baseUrl}immunization/history/${id}?page=${page}&size=${pageSize}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response?.data;
};
