export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwMzU4MDMzfQ.V35jWkJWKSPnt_qOCwM-Zwp5MNmTw8aMF1-pETW_CEu_lQap-FmEi-a4pgdmQN9ABrR2KnY3BZ85FU8W6GV-Ww"
    : new URLSearchParams(window.location.search).get("jwt");
