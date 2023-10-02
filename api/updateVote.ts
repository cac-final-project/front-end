import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface updateVoteProps {
    postId: number;
    vote: Vote;
}

export const updateVote = async ({
    postId,
    vote,
}: updateVoteProps): Promise<ApiResponse | undefined> => {
    try {
        const token = await AsyncStorage.getItem(KEYS_AND_DEFAULT.token[0]);
        const response = await api.post(
            'post/vote',
            { postId: postId, direction: vote },
            {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token!)}`,
                },
            }
        );
        return response.data;
    } catch (err) {
        console.log(err);
        return undefined;
    }
};
