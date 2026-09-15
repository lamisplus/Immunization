export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZGUtdXNlciIsImF1dGgiOiJTdXBlciBBZG1pbixVc2VyLFJERSIsImV4cCI6MTc4OTQ4ODQ4OSwibmFtZSI6InJkZS11c2VyIGxhc3RuYW1lIn0.igiiiMpN4auDAZ-9bfT0km2A4Rm4bDTF2vkQqLSZYH9p2R6RrpzqlAPBXgsUpdNgi0vMBITF6mEDsoKodcbHcQ"
    : new URLSearchParams(window.location.search).get("jwt");
