export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA4NjM4NjM5fQ.VWSh_xSFHQg00MCauMZT9hr7TjXNFUAeRLwRrJD_ci6l5bTMl9-YyPeHnMN43ehj4F4_Vw_E_gsjVB2o7AZf9A"
    : new URLSearchParams(window.location.search).get("jwt");
