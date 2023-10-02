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
    console.log('neighbor', lat, lon);
    try {
        const response = await api.get<ApiResponse>('geo', {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        if (response.data.result) {
            await AsyncStorage.setItem(
                KEYS_AND_DEFAULT.neighborhood[0],
                response.data.data
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
