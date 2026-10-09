import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchCodesets = async (code) => {
  const response = await axios.get(
    `${baseUrl}application-codesets/v2/${encodeURIComponent(code)}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  // Only a list is a usable codeset; anything else (e.g. an HTML fallback
  // page) is treated as empty.
  return Array.isArray(response.data) ? response.data : [];
};
