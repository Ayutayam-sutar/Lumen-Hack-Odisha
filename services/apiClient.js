// Inside src/services/apiClient.js
import axios from 'axios';

// Step 1: Read the "secret address" from the environment.
// When you run `npm run dev`, it will be 'http://localhost:5000'.
// On Netlify, it will be your live Render URL.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const apiClient = axios.create({
    // Step 2: Use the variable to create the full API URL.
    baseURL: `${API_BASE_URL}/api`,
});

export const setAuthToken = (token) => {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
};

export default apiClient;