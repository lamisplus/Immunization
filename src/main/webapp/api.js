export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA5NTcwNjQzfQ.ewbPM4bv_YiSCp5Bq2Y6o82rvLgNrJzpJtxsooXK_FAtxLRLLBeRLi3-D1PmLDmX0tv0XGTIKXq9kOvpEOoU4w"
    : new URLSearchParams(window.location.search).get("jwt");
