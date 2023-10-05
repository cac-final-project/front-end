import api from './api';
import { ApiResponse } from './api';

interface IGetAddress {
    lat: string;
    lon: string;
}

export const getAddress = async ({
    lat,
    lon,
}: IGetAddress): Promise<ApiResponse | undefined> => {
    try {
        const response = await api.get<ApiResponse>('geo', {
            params: {
                lat: lat,
                lon: lon,
            },
        });
        return response.data;
    } catch (err) {
        console.error('Error fetching geo data:', err);
        return undefined;
    }
};
