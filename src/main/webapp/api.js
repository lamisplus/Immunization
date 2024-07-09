export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5NDMxNTYwfQ.SZ25uWW9slEycNCerOlncmwZGbds_e54jsB_voMhL0qoqvQD-9h1WZ6AinCJ0Xl1fczbFp2xYL_7JgcXloE5FQ"
    : new URLSearchParams(window.location.search).get("jwt");
