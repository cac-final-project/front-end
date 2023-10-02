import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const findResources = async (): Promise<ApiResponse | undefined> => {
    try {
        const lat = await AsyncStorage.getItem(KEYS_AND_DEFAULT.lat[0]);
        const lon = await AsyncStorage.getItem(KEYS_AND_DEFAULT.lon[0]);

        const response = await api.get(`resources?lat=${lat}&lon=${lon}`);
        return response.data;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};
