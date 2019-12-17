import axios from 'axios';
import { authHeader } from '../_helpers';

export default() => {
  return axios.create({
    baseURL: `http://localhost:9000/TestVault/Demo/api`,
    headers: authHeader(),
  });
};