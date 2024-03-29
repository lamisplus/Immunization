export const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8383/api/v1/"
    : "/api/v1/";
export const token =
  process.env.NODE_ENV === "development"
<<<<<<< HEAD
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNzYyMjUxfQ.9Wd7QSX6wOyAUsH83qsdkQ9ZCOn3zygKA3tyOx9SCQoby-tUAeWWK9B0z3nyKujd2erAuSYHCTFKApAReh_1Iw"
=======
    ? "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzExNzI4MjI3fQ.a1w8hl8uRbjh9C7gwRX3DrigMluNwQyxP9J4bnzlXFcsb0zOXOemalOoY0658T_5nVbDEZe-Kv1109YLQClvdA"
>>>>>>> 01db469d07a83427ee0c4d3c149c9f742c0140ab
    : new URLSearchParams(window.location.search).get("jwt");
