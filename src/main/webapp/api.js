export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8383/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA2MTc1ODAxfQ.aAXvi_q_cClUij8w90k1XatkaZ4Foc8mDt3Ly-rLPHlOIT7Lofpo21_Oe1NCDb4CJH-DZ-5YHtbxJdDGBzR5qQ';