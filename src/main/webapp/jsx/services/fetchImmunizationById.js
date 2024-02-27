import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchImmunizationById = async (id) => {
  const response = await axios.get(
    `${baseUrl}immunization/${id}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );

  return response?.data;
};
