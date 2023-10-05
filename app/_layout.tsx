import { useEffect } from 'react';
import { SplashScreen, Stack } from 'expo-router';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import { validateToken } from '@/api/validateToken';
import { refreshToken } from '@/api/refreshToken';
import { Neighborhood, Profile } from '@/components/header/index';
import CancelBtn from '@/components/cancelBtn';

// SplashScreen.preventAutoHideAsync();

const _layout = () => {
    const handleRootData = async () => {
        try {
            // 1) location
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                // await SplashScreen.hideAsync();
                await AsyncStorage.setItem(
                    KEYS_AND_DEFAULT.lat[0],
                    KEYS_AND_DEFAULT.lat[1]
                );
                await AsyncStorage.setItem(
                    KEYS_AND_DEFAULT.lon[0],
                    KEYS_AND_DEFAULT.lon[1]
                );
            } else {
                let location = await Location.getCurrentPositionAsync({});
                const latitude = '30.270409';
                const longitude = '-97.744708';
                // const latitude = location.coords.latitude;
                // const longitude = location.coords.longitude;
                await AsyncStorage.setItem(KEYS_AND_DEFAULT.lat[0], latitude);
                await AsyncStorage.setItem(KEYS_AND_DEFAULT.lon[0], longitude);
            }
            // await validateToken();
            await refreshToken();
        } catch (err) {
            await AsyncStorage.setItem(
                KEYS_AND_DEFAULT.lat[0],
                KEYS_AND_DEFAULT.lat[1]
            );
            await AsyncStorage.setItem(
                KEYS_AND_DEFAULT.lon[0],
                KEYS_AND_DEFAULT.lon[1]
            );
            console.error('Failed to set location:', err);
        }
    };

    useEffect(() => {
        handleRootData();
    }, []);

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="profile"
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: '#D3D3D3',
                    },
                    headerTitle: 'My Profile',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        color: 'black',
                        fontSize: 16,
                        fontWeight: '500',
                    },
                }}
            />
            <Stack.Screen
                name="login"
                options={{
                    headerTitle: ' ',
                    headerStyle: {
                        backgroundColor: '#B4B4B4',
                    },
                    headerShadowVisible: false, // For iOS
                }}
            />
            <Stack.Screen
                name="alert"
                options={{
                    headerTitle: ' ',
                    headerStyle: {
                        backgroundColor: '#B4B4B4',
                    },
                    headerShadowVisible: false, // For iOS
                }}
            />
            <Stack.Screen
                name="map"
                options={{
                    headerTitle: (props) => <Neighborhood />,
                    headerRight: (props) => <Profile />,
                    headerTitleAlign: 'center', // This ensures that the title is centered
                    headerStyle: {
                        backgroundColor: '#B4B4B4',
                    },
                }}
            />
            <Stack.Screen
                name="write"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="tipWrite"
                options={{
                    headerShown: false,
                    // headerTitle: 'Write Tips',
                    // headerRight: (props) => <Profile />,
                    // headerTitleAlign: 'center',
                    // headerStyle: {
                    //     backgroundColor: '#B4B4B4',
                    // },
                }}
            />
            <Stack.Screen
                name="campaignWrite"
                options={{
                    headerShown: false,
                    // headerTitle: 'Write Campaigns',
                    // headerRight: (props) => <Profile />,
                    // headerLeft: (props) => <CancelBtn />,
                    // headerTitleAlign: 'center', // This ensures that the title is centered
                    // headerStyle: {
                    //     backgroundColor: '#B4B4B4',
                    // },
                }}
            />
            <Stack.Screen
                name="postDetail"
                options={{
                    headerTitle: (props) => <Neighborhood />,
                    headerRight: (props) => <Profile />,
                    headerTitleAlign: 'center', // This ensures that the title is centered
                    headerStyle: {
                        backgroundColor: '#B4B4B4',
                    },
                }}
            />
        </Stack>
    );
};

export default _layout;
