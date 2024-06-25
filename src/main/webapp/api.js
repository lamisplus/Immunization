export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzE5MzM0OTc0fQ.-2V8SAxlHvHE3KtpAhcIOf4yn2jgfEcJ-QEiC9SfT_XzySmstrqDO3eDfAIfikWnHo37xjZKvBdXL82s4Q3kzg"
    : new URLSearchParams(window.location.search).get("jwt");
