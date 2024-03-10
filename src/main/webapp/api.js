export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwMDk3NjI1fQ.baueWIv586roBbtlD8awc5l_XFdqB8dhxK0DwjxA4eqWg5Uz5lajw01KkaeKXBRlGhmEDzfCNUsGLWtY21rzlw"
    : new URLSearchParams(window.location.search).get("jwt");
