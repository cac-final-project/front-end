import api from './api';
import { ApiResponse } from './api';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface createPostProps {
    title: string;
    content: string;
    selectedImages: string[];
    tags: string[];
    postType: 'tip' | 'campaign'; // Added this line
    lat: number;
    lon: number;
    addressName: string;
}

export const createPost = async ({
    selectedImages,
    tags,
    title,
    content,
    postType,
    lat,
    lon,
    addressName,
}: createPostProps) => {
    try {
        const token = await AsyncStorage.getItem(KEYS_AND_DEFAULT.token[0]);
        const formData = new FormData();

        selectedImages.forEach((imageUri, index) => {
            // Determine the file type based on the URI.
            const fileType = imageUri.substring(imageUri.lastIndexOf('.') + 1);

            // Extract the filename from the path
            const fileName = imageUri.substring(imageUri.lastIndexOf('/') + 1);

            formData.append('files', {
                uri: imageUri,
                type: `image/${fileType}`,
                name: fileName,
            } as any);
        });

        // Append title and content to the formData
        formData.append('title', title);
        formData.append('content', content);
        formData.append('type', postType);
        if (postType === 'campaign') {
            formData.append('lon', String(lat));
            formData.append('lat', String(lon));
            formData.append('addressName', addressName);
        }

        // Append tags with key name "tags" as comma-separated string
        formData.append('tags', tags.join(', '));

        const response = await api.post<ApiResponse>(`post`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token!)}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data; // or whatever processing you need
    } catch (err) {
        console.log(err);
        return undefined;
    }
};
