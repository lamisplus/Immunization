import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchPatientVaccinationHistory = async ({
  page,
  pageSize,
  search,
  id,
}) => {
  const response = await axios.get(
    `${baseUrl}immunization/history/${id}?pageSize=${pageSize}&pageNo=${page}&searchParam=${search}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response?.data;
};
