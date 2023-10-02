import { useState, useEffect } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Spinner } from '@/components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import { findResources, getNeighborhood } from '@/api/index';
import { Weather, Alert, Resources } from '@/components/index/index';

declare global {
    interface IResourceData {
        tags: string[];
        amenities: string[];
        data: TResource[];
    }
    type TResource = {
        id: number;
        lat: number;
        lon: number;
        address: string;
        amenity: Amenity;
        tags: Amenity[];
        distance: number;
    };
}

const index = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [resourcesData, setResourcesData] = useState<
        IResourceData | undefined
    >(undefined);

    // need to be refactored...
    const handleStorage = async () => {
        const lat = await AsyncStorage.getItem(KEYS_AND_DEFAULT.lat[0]);
        const lon = await AsyncStorage.getItem(KEYS_AND_DEFAULT.lon[0]);
        const isNeighborhoodReady = await getNeighborhood({
            lat: lat!,
            lon: lon!,
        });
        const resourcesResponse = await findResources();
        setResourcesData(resourcesResponse?.data);
        if (isNeighborhoodReady) {
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        handleStorage();
    }, []);
    return (
        <SafeAreaView style={styles.container}>
            <Spinner visible={!isLoaded} spinnerContent={'Loading...'} />
            {isLoaded && (
                <>
                    <Weather />
                    <Alert />
                    <Resources resourcesData={resourcesData} />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});

export default index;
