import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IFetchPosts {
    page?: number;
    limit?: number;
    author?: string;
    type?: 'tip' | 'campaign';
}

export const fetchPosts = async ({
    page = 1,
    limit = 10,
    author,
    type,
}: IFetchPosts = {}): Promise<ApiResponse | undefined> => {
    try {
        const token = await AsyncStorage.getItem(KEYS_AND_DEFAULT.token[0]);
        const baseUrl = `post?page=${page}&limit=${limit}`;

        // Check if author and type are provided and append them to the URL accordingly.
        const authorParam = author ? `&author=${author}` : '';
        const typeParam = type ? `&type=${type}` : '';

        const finalUrl = `${baseUrl}${authorParam}${typeParam}`;

        const response = await api.get<ApiResponse>(finalUrl, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token!)}`,
            },
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};
