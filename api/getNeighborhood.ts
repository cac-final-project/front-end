import api from './api';
import { ApiResponse } from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';

interface IGetNeighborhood {
    lat: string;
    lon: string;
}

export const getNeighborhood = async ({
    lat,
    lon,
}: IGetNeighborhood): Promise<boolean> => {
    try {
        const response = await api.get<ApiResponse>('geo', {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        if (response.data.result) {
            const data = response.data.data;
            const address = data?.neighbourhood || data?.city || data?.county;
            await AsyncStorage.setItem(
                KEYS_AND_DEFAULT.neighborhood[0],
                address
            );
            return true;
        } else {
            await AsyncStorage.setItem(
                KEYS_AND_DEFAULT.neighborhood[0],
                KEYS_AND_DEFAULT.neighborhood[1]
            );
            return true;
        }
    } catch (err) {
        console.error('Error fetching geo data:', err);
        return true;
    }
};
