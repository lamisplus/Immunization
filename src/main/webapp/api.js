export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZGUtdXNlciIsImF1dGgiOiJTdXBlciBBZG1pbixVc2VyLFJERSIsImV4cCI6MTc5MzE1NzY0MiwibmFtZSI6InJkZS11c2VyIGxhc3RuYW1lIn0.-LpGkfG7fR1679auJq5r3Mu01ViSp3CkQxg5q78YXfD6L-i1mgQ3GKC8HPIVUIFgKI49TjLlyUcHdyInHMiNjw"
    : new URLSearchParams(window.location.search).get("jwt");
