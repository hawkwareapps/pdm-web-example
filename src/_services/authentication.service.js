import axios from 'axios';

export const authenticationService = {
  login,
  logout
};

function login(username, password) {
  return axios.create({
    baseURL: `http://localhost:9000/TestVault/Demo/api`,
    headers: { 'Content-Type': 'application/json' }
  }).post('Token', JSON.stringify({ username, password })).then(r => {
    if(r){
      localStorage.setItem('token', r.data);
      localStorage.setItem('username', username);
      return {
        username: username,
        token: r.data
      };
    }
  });
}

function logout() {
  localStorage.removeItem('username');
  localStorage.removeItem('token');
}