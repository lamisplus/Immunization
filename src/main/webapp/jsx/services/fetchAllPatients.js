import axios from "axios";
import { token, url as baseUrl } from "./../../api";

export const fetchAllPatients = async ({ page, pageSize, search }) => {
  const response = await axios.get(
    `${baseUrl}patient?pageSize=${pageSize}&pageNo=${page}&searchParam=${search}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};
