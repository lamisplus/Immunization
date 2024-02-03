import axios from "axios";
import { token, url as baseUrl } from "./../../api";

export const fetchAllCovidVaccinatedPatients = async ({ page, pageSize, search }) => {
 
  const response = await axios.get(
    `${baseUrl}covid/vaccinated-patients?pageSize=${pageSize}&pageNo=${page}&searchParam=${search}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response?.data;
};
