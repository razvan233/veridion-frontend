import axios from 'axios';
import { API_AUTH } from './vars';
const api = axios.create({
  
    baseURL:'http://localhost:5000',
    auth: {
        username: API_AUTH.USERNAME,
        password: API_AUTH.PASSWORD,
      },
});

export default api;