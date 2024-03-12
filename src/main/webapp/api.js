export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzEwMjgzNTEwfQ.fte0j1CQx9Pq-HsoIFFeFTHiinm4Xr_mFMpFE6c8NSpk30UgAqDZVspE5L1Si6zxe4krdlnmMSRc3lNWZl6qew"
    : new URLSearchParams(window.location.search).get("jwt");
