import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchCovidVaccines = async (code) => {
  const response = await axios.get(`${baseUrl}covid/codeset?category=VACCINE`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
