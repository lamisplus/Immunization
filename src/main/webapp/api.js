export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwNzgxOTgyfQ.IF9dZ1nn0b71XbhGgBTY7jMM6V98scYYpGgrrGQazvsmtY2_mNJUzPPt150NI03HTd7tZhJHAW6otwtpLF00zQ"
    : new URLSearchParams(window.location.search).get("jwt");
