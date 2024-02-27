export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA4OTcwMzUxfQ.ZtNPEvRTrc7_Pwd-ibhCQ1Rkc44hRxp_HvSKtLAWLoCbaKadgBzeBcx6KNDxI9EvX8efScPtqY5k-__aNGOqKg"
    : new URLSearchParams(window.location.search).get("jwt");
