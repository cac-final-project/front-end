import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getProfile = async (): Promise<ApiResponse | undefined> => {
    try {
        const token = await AsyncStorage.getItem(KEYS_AND_DEFAULT.token[0]);
        const response = await api.get<ApiResponse>('profile', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token!)}`,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching profile data:', err);
        return undefined;
    }
};
