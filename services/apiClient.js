// Inside src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
});

export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

export default apiClient;