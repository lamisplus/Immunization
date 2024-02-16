export const url = process.env.NODE_ENV === "development"
  ? "http://localhost:8383/api/v1/"
  : "/api/v1/";
export const token = process.env.NODE_ENV === "development"
  ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA3ODU4NzUyfQ.Kwp5JlGxoRe9_iE6qPAR2SaQFAj9vbnHlQazjZMrwN-FF_2w1MCbaDCHjAPGaXbqW0TDDybZk-EIzWuZqkYgYA"
  : new URLSearchParams(window.location.search).get("jwt");
