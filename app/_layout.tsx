import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import { validateToken } from '@/api/validateToken';

// SplashScreen.preventAutoHideAsync();

const _layout = () => {
    const handleRootData = async () => {
        try {
            // 1) location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // await SplashScreen.hideAsync();
                await AsyncStorage.setItem(
                    KEYS_AND_DEFAULT.location[0],
                    JSON.stringify(KEYS_AND_DEFAULT.location[1])
                );
            } else {
                let location = await Location.getCurrentPositionAsync({});
                const latitude = location.coords.latitude;
                const longitude = location.coords.longitude;
                await AsyncStorage.setItem(
                    KEYS_AND_DEFAULT.location[0],
                    JSON.stringify({ lat: latitude, lon: longitude })
                );
            }
            await validateToken();
        } catch (err) {
            console.error('Failed to set location:', err);
        }
    };

    useEffect(() => {
        handleRootData();
    }, []);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
    );
};

export default _layout;
