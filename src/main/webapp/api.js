export const  token = (new URLSearchParams(window.location.search)).get("jwt")
export const url = '/api/v1/'

// export const url =  'http://localhost:8383/api/v1/';
// export const  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWVzdEBsYW1pc3BsdXMub3JnIiwiYXV0aCI6IlN1cGVyIEFkbWluIiwibmFtZSI6Ikd1ZXN0IEd1ZXN0IiwiZXhwIjoxNzA2NjMyMDgwfQ.xuqRb2RQM79GQdudQdUYIp7_e2e0y5sRcD9eqRdXM3w6q9iN66ztDLsruX9j8ZmB9qDmajCFj09l1lRG1VOWEw';