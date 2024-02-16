import axios from "axios";
import { token, url as baseUrl } from "../../api";

export const fetchCodesets = async (code) => {
  const response = await axios.get(
    `${baseUrl}application-codesets/v2/${code}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
