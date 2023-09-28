import { useState, useEffect } from 'react';
import { SafeAreaView, Text } from 'react-native';
import { Spinner } from '@/components/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import { getNeighborhood } from '@/api/getNeighborhood';

const resource = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    const handleStorage = async () => {
        const location = await AsyncStorage.getItem(
            KEYS_AND_DEFAULT.location[0]
        );
        const isNeighborhoodReady = await getNeighborhood(
            JSON.parse(location!) as Ilocation
        );

        if (isNeighborhoodReady) {
            setIsLoaded(true);
        }
    };

    useEffect(() => {
        handleStorage();
    }, []);
    return (
        <SafeAreaView>
            <Spinner visible={!isLoaded} spinnerContent={'Loading...'} />
            <Text>Hello</Text>
        </SafeAreaView>
    );
};

export default resource;
