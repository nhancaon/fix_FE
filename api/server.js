import axios from 'axios';
const baseUrl = 'http://192.168.1.2:8082/api';

const api = axios.create({
    baseURL: `${baseUrl}`,
});

export default api;