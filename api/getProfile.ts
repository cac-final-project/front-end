import api from './api';
import { ApiResponse } from './api';

export const getProfile = async (): Promise<ApiResponse | undefined> => {
    try {
        const response = await api.get<ApiResponse>('profile');
        return response.data;
    } catch (err) {
        console.error('Error fetching geo data:', err);
        return undefined;
    }
};
