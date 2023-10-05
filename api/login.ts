import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

declare global {
    interface LoginInfo {
        username: string;
        password: string;
    }
}

export const loginApi = async ({
    username,
    password,
}: LoginInfo): Promise<ApiResponse | undefined> => {
    try {
        const response = await api.post<ApiResponse>('user/login', {
            username,
            password,
        });
        if (response.data.result) {
            const token = response.data.data.token;
            AsyncStorage.setItem(KEYS_AND_DEFAULT.username[0], username);
            AsyncStorage.setItem(KEYS_AND_DEFAULT.password[0], password);
            AsyncStorage.setItem(
                KEYS_AND_DEFAULT.token[0],
                JSON.stringify(token)
            );
            AsyncStorage.setItem(
                KEYS_AND_DEFAULT.isLoggedIn[0],
                JSON.stringify(true)
            );
            AsyncStorage.setItem(
                KEYS_AND_DEFAULT.userType[0],
                JSON.stringify(response.data.data.type)
            );
        }
        return response.data;
    } catch (err) {
        return undefined;
    }
};
