import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const validateToken = async () => {
    try {
        const storedToken = await AsyncStorage.getItem(
            KEYS_AND_DEFAULT.token[0]
        );
        if (!storedToken) {
            return await AsyncStorage.setItem(
                KEYS_AND_DEFAULT.isLoggedIn[0],
                JSON.stringify(false)
            );
        }
        const headers = {
            Authorization: `Bearer ${storedToken}`,
        };

        const response = await api.post<ApiResponse>(
            'user/validateToken',
            {},
            { headers }
        );
        if (response.data.result) {
            await AsyncStorage.setItem(
                KEYS_AND_DEFAULT.isLoggedIn[0],
                JSON.stringify(true)
            );
            await AsyncStorage.setItem(KEYS_AND_DEFAULT.token[0], storedToken);
        } else {
            const username = await AsyncStorage.getItem(
                KEYS_AND_DEFAULT.username[0]
            );
            const password = await AsyncStorage.getItem(
                KEYS_AND_DEFAULT.password[0]
            );
            const loginResponse = await api.post<ApiResponse>('user/login', {
                username,
                password,
            });
            const newToken = loginResponse.data.data?.token;
            return await AsyncStorage.setItem(
                KEYS_AND_DEFAULT.token[0],
                newToken
            );
        }
    } catch (err) {
        return undefined;
    }
};
