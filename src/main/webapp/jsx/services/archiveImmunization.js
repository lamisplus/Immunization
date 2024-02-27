import axios from "axios";
import { token, url as baseUrl } from "../../api";

const config = {
  headers: { Authorization: `Bearer ${token}` },
};

export const archiveImmunzation = async (id) => {
  const response = await axios.put(
    `${baseUrl}immunization/${id}/archive`,
    null,
    config
  );

  return response.data;
};
