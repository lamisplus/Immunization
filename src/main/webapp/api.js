export const url = process.env.NODE_ENV === "development"
  ? "http://localhost:8383/api/v1/"
  : "/api/v1/";
export const token = process.env.NODE_ENV === "development"
  ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA4MTAxMjkzfQ.DifHMd9ULaosBR_QWA4mJ9fb76B2D-1m3QmF-GXrNJ7YxOgOjvFrgPiJ0MMlnf_7F8d6JhFmBa7M4Oe0mw8FwA"
  : new URLSearchParams(window.location.search).get("jwt");
