export const url = process.env.NODE_ENV === "development"
  ? "http://localhost:8383/api/v1/"
  : "/api/v1/";
export const token = process.env.NODE_ENV === "development"
  ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA2OTczNzc3fQ.7OtAAtf6ZiLElr4BQLBMz2TL9OJvtlchBQM2_ebe6R2WFxcQ-mO_t46Lmc3mfAgLu14fDxzqM-Dss4WC61GvEw"
  : new URLSearchParams(window.location.search).get("jwt");
