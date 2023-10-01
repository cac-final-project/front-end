import { loginApi } from './login';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const refreshToken = async () => {
    try {
        const username = await AsyncStorage.getItem(
            KEYS_AND_DEFAULT.username[0]
        );
        const password = await AsyncStorage.getItem(
            KEYS_AND_DEFAULT.password[0]
        );
        if (username && password) {
            await loginApi({ username, password });
        }
    } catch (err) {
        console.log(err);
        return undefined;
    }
};
