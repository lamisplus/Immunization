// Shared helpers for component tests. The axios module is mocked by each test
// file (jest.mock("axios")); these helpers only shape its responses.
import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./utils/queryClient";

// Renders with the app's own QueryClient so retry/caching match production.
export const renderWithProviders = (ui) => {
  queryClient.clear();
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>
  );
};

export const deferred = () => {
  let resolve;
  let reject;
  const promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
};

// Error bodies as returned by the running backend (captured from :8383):
// Spring's default error JSON for 4xx/5xx, the security filter's for 401.
export const springError = (status, error) =>
  Object.assign(new Error(`Request failed with status code ${status}`), {
    response: {
      status,
      data: { timestamp: "2026-10-09T00:00:00.000+00:00", status, error, message: "", path: "/api/v1/immunization" },
    },
  });

export const unauthorizedError = () =>
  Object.assign(new Error("Request failed with status code 401"), {
    response: {
      status: 401,
      data: { apierror: { status: "UNAUTHORIZED", message: "Invalid Token", statusCode: 401 } },
    },
  });

export const networkError = () => new Error("Network Error");

// axios.get mock that answers by URL substring.
export const routeGet = (routes) => (rawUrl) => {
  const url = decodeURIComponent(rawUrl);
  const match = Object.keys(routes).find((key) => url.includes(key));
  if (!match) return Promise.reject(new Error(`Unmocked GET ${url}`));
  const value = routes[match];
  return typeof value === "function" ? value(url) : Promise.resolve({ data: value });
};

export const patient = {
  id: 29262,
  uuid: "5d1c7d2e-0000-4000-8000-000000000001",
  firstName: "Test",
  surname: "Patient",
  dateOfBirth: "2010-01-30",
  gender: { id: 2, display: "Female" },
};

// Routine immunization codesets exactly as the LAMISPlus server returns them
// (captured from /application-codesets/v2/<codeset>).
const rows = (list) => list.map(([id, code, display]) => ({ id, code, display }));
export const routineCodesets = {
  "IMMUNIZATION_VACCINE_AT_BIRTH": rows([
    [1273, "IMMUNIZATION_AT_BIRTH_BCG", "BCG"],
    [1275, "IMMUNIZATION_AT_BIRTH_HEP_B_BIRTH_", "Hep B birth"],
    [1274, "IMMUNIZATION_AT_BIRTH_OPVD", "OPVD"],
  ]),
  "IMMUNIZATION_VACCINE_AT_6 WEEKS": rows([
    [1278, "IMMUNIZATION_AT_6_WEEKS_OPV_1", "OPV 1"],
    [1633, "IMMUNIZATION_AT_6_WEEKS_PENTAVALENT_(DPT,_HEP_B_AND_HIB)_1", "Pentavalent (DPT, Hep B and Hib) 1"],
    [1277, "IMMUNIZATION_AT_6_WEEKS_PNEMOCOCAL_CONJUGATE_VACCINE_1", "Pnemococal Conjugate Vaccine 1"],
    [1279, "IMMUNIZATION_AT_6_WEEKS_ROTA_1", "Rota 1"],
  ]),
  "IMMUNIZATION_VACCINE_AT_10 WEEKS": rows([
    [1282, "IMMUNIZATION_AT_10_WEEKS_OPV_2", "OPV 2"],
    [1634, "IMMUNIZATION_AT_10_WEEKS_PENTAVALENT_(DPT,_HEP_B_AND_HIB)_2", "Pentavalent (DPT, Hep B and Hib) 2"],
    [1281, "IMMUNIZATION_AT_10_WEEKS_PNEMOCOCAL_CONJUGATE_VACCINE_2", "Pnemococal Conjugate Vaccine 2"],
    [1283, "IMMUNIZATION_AT_10_WEEKS_ROTA_2", "Rota 2"],
  ]),
  "IMMUNIZATION_VACCINE_AT_14 WEEKS": rows([
    [1287, "IMMUNIZATION_AT_14_WEEKS_IPV", "IPV"],
    [1286, "IMMUNIZATION_AT_14_WEEKS_OPV_3", "OPV 3"],
    [1635, "IMMUNIZATION_AT_14_WEEKS_PENTAVALENT_(DPT,_HEP_B_AND_HIB)_3", "Pentavalent (DPT, Hep B and Hib) 3"],
    [1285, "IMMUNIZATION_AT_14_WEEKS_PNEMOCOCAL_CONJUGATE_VACCINE_3", "Pnemococal Conjugate Vaccine 3"],
  ]),
  "IMMUNIZATION_VACCINE_AT_6 MONTHS": rows([
    [1288, "IMMUNIZATION_AT_6_MONTHS_VITAMIN_A_1ST_DOSE", "Vitamin A 1st dose"],
  ]),
  "IMMUNIZATION_VACCINE_AT_9 MONTHS": rows([
    [1289, "IMMUNIZATION_AT_9_MONTHS_MEASLES_1ST_DOES", "Measles 1st dose"],
    [1291, "IMMUNIZATION_AT_9_MONTHS_MENINGITIS_VACCINE", "meningitis vaccine"],
    [1290, "IMMUNIZATION_AT_9_MONTHS_YELLOW_FEVER", "yellow fever"],
  ]),
  "IMMUNIZATION_VACCINE_AT_15 MONTHS": rows([
    [1293, "IMMUNIZATION_AT_15_MONTHS_MEASLES_2_DOSE_(MCV2)", "Measles 2 dose (MCV2)"],
    [1292, "IMMUNIZATION_AT_15_MONTHS_VITAMIN_A_2ND_DOSE", "Vitamin A 2nd dose"],
  ]),
  "IMMUNIZATION_VACCINE_AT_9 YEARS": rows([[1294, "IMMUNIZATION_AT_9_YEARS_HPV", "HPV"]]),
  "ROUTINE_IMMUNIZATION_VACCINE_TYPE": rows([
    [1247, "ROUTINE_VACCINE_TYPE_BCG", "BCG"],
    [1249, "ROUTINE_VACCINE_TYPE_HEP_B_BIRTH_", "Hep B birth"],
    [1259, "ROUTINE_VACCINE_TYPE_IPV", "IPV"],
    [1632, "ROUTINE_VACCINE_TYPE_MEASLES_1ST_DOSE", "Measles 1st dose"],
    [1252, "ROUTINE_VACCINE_TYPE_OPV_1", "OPV 1"],
    [1255, "ROUTINE_VACCINE_TYPE_OPV_2", "OPV 2"],
    [1258, "ROUTINE_VACCINE_TYPE_OPV_3", "OPV 3"],
    [1248, "ROUTINE_VACCINE_TYPE_OPVD", "OPVD"],
    [1629, "ROUTINE_VACCINE_TYPE_PENTAVALENT_(DPT,_HEP_B_AND_HIB)_1", "Pentavalent (DPT, Hep B and Hib) 1"],
    [1630, "ROUTINE_VACCINE_TYPE_PENTAVALENT_(DPT,_HEP_B_AND_HIB)_2", "Pentavalent (DPT, Hep B and Hib) 2"],
    [1631, "ROUTINE_VACCINE_TYPE_PENTAVALENT_(DPT,_HEP_B_AND_HIB)_3", "Pentavalent (DPT, Hep B and Hib) 3"],
    [1251, "ROUTINE_VACCINE_TYPE_PNEMOCOCAL_CONJUGATE_VACCINE_1", "Pnemococal Conjugate Vaccine 1"],
    [1254, "ROUTINE_VACCINE_TYPE_PNEMOCOCAL_CONJUGATE_VACCINE_2", "Pnemococal Conjugate Vaccine 2"],
    [1257, "ROUTINE_VACCINE_TYPE_PNEMOCOCAL_CONJUGATE_VACCINE_3", "Pnemococal Conjugate Vaccine 3"],
    [1253, "ROUTINE_VACCINE_TYPE_ROTA_1", "Rota 1"],
    [1256, "ROUTINE_VACCINE_TYPE_ROTA_2", "Rota 2"],
    [1260, "ROUTINE_VACCINE_TYPE_VITAMIN_A_1ST_DOSE", "Vitamin A 1st dose"],
  ]),
  "TETANUS_VACCINE": rows([
    [1268, "TETANUS_VACCINE_TD1", "Td1"],
    [1269, "TETANUS_VACCINE_TD2", "Td2"],
    [1270, "TETANUS_VACCINE_TD3", "Td3"],
    [1271, "TETANUS_VACCINE_TD4", "Td4"],
    [1272, "TETANUS_VACCINE_TD5", "Td5"],
  ]),
};

// axios.get routes for every codeset above.
export const codesetRoutes = Object.fromEntries(
  Object.entries(routineCodesets).map(([codeset, list]) => [
    `application-codesets/v2/${codeset}`,
    list,
  ])
);
