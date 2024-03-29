export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNzYyMjUxfQ.9Wd7QSX6wOyAUsH83qsdkQ9ZCOn3zygKA3tyOx9SCQoby-tUAeWWK9B0z3nyKujd2erAuSYHCTFKApAReh_1Iw"
    : new URLSearchParams(window.location.search).get("jwt");
