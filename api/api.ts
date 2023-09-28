import axios from 'axios';

export interface ApiResponse {
    result: boolean;
    code: number;
    data?: any; // Consider being more specific than 'any' if possible
}

const api = axios.create({
    baseURL: 'http://10.0.2.2:8280/api/', // replace with your API base URL
    timeout: 10000, // your desired timeout
});

export default api;
