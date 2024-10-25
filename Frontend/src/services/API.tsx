import axios from 'axios';

const APIURL = 'http://localhost:8000/api';

const API = axios.create({
  baseURL: `${APIURL}`,
});

export default API;
