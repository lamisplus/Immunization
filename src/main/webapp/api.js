export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZGUtdXNlciIsImF1dGgiOiJTdXBlciBBZG1pbixVc2VyLFJERSIsImV4cCI6MTc5MTQ5Nzk4MCwibmFtZSI6InJkZS11c2VyIGxhc3RuYW1lIn0.0GTUpPExrW4V9djE15U1v9BcUKH7pplvz5El0iHiaa76t5Wdnkn5tg7Td5hpt05NtR3YSAUlRDMZFxXyShKlLg"
    : new URLSearchParams(window.location.search).get("jwt");
