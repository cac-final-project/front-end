import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface getAuthorProfileProps {
    author: string;
}

export const getAuthorProfile = async ({
    author,
}: getAuthorProfileProps): Promise<ApiResponse | undefined> => {
    try {
        const token = await AsyncStorage.getItem(KEYS_AND_DEFAULT.token[0]);
        const response = await api.get<ApiResponse>('profile/author', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token!)}`,
            },
            params: {
                author,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching profile data:', err);
        return undefined;
    }
};
