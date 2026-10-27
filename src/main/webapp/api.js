export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZGUtdXNlciIsImF1dGgiOiJTdXBlciBBZG1pbixVc2VyLFJERSIsImV4cCI6MTc5MTUzMTg4NiwibmFtZSI6InJkZS11c2VyIGxhc3RuYW1lIn0.ruYRq-BIv1RVOk_gy69t5YEyeIJqPYXCbmeWCAMDATk94RLgWBJuDrA3pQNmSH4P4dRyBi1RSm1l8E3Sf6hD6Q"
    : new URLSearchParams(window.location.search).get("jwt");
