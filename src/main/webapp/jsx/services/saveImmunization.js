import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const saveImmunization = async (data) => {
  const response = await axios.post(`${baseUrl}immunization`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
