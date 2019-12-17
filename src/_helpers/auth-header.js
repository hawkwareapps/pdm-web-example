export function authHeader() {
  // return authorization header with token
  let username = localStorage.getItem('username');
  let token = localStorage.getItem('token');

  if (username && token) {
      return { 'Authorization': token };
  } else {
      return {};
  }
}