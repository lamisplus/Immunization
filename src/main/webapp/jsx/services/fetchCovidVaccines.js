import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchCovidVaccines = async (code) => {
  const response = await axios.get(`${baseUrl}covid/codeset?category=VACCINE`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  // Without the COVID module this path falls through to the host SPA, which
  // answers 200 with HTML; only a list is usable as vaccine options.
  return Array.isArray(response.data) ? response.data : [];
};
