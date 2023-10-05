import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IFetchPost {
    postId: number;
}

export const fetchPost = async ({
    postId,
}: IFetchPost): Promise<ApiResponse | undefined> => {
    try {
        const token = await AsyncStorage.getItem(KEYS_AND_DEFAULT.token[0]);
        const response = await api.get('post/single', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token!)}`,
            },
            params: { postId },
        });
        return response.data;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};
