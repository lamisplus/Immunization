export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNzI4MjI3fQ.a1w8hl8uRbjh9C7gwRX3DrigMluNwQyxP9J4bnzlXFcsb0zOXOemalOoY0658T_5nVbDEZe-Kv1109YLQClvdA"
    : new URLSearchParams(window.location.search).get("jwt");
