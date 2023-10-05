import React, { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';

interface PlusProps {
    activeTab: PostType;
}

const Plus: React.FC<PlusProps> = ({ activeTab }) => {
    const router = useRouter();

    const handlePlusClick = async () => {
        const isLoggedIn = JSON.parse(
            (await AsyncStorage.getItem(KEYS_AND_DEFAULT.isLoggedIn[0])) ||
                'false'
        );

        if (isLoggedIn) {
            const userTypeRetrieved = await AsyncStorage.getItem(
                KEYS_AND_DEFAULT.userType[0]
            );
            const userType = JSON.parse(userTypeRetrieved!);

            if (userType === 'user') {
                if (activeTab === 'tip') {
                    // router.push('/tipWrite');
                    router.push({
                        pathname: '/write',
                        params: {
                            writeType: 'tip',
                        },
                    });
                } else {
                    Alert.alert(
                        'Only Volunteers can create campaigns!',
                        'Move to signup page?',
                        [
                            {
                                text: 'Cancel',
                                style: 'cancel',
                            },
                            {
                                text: 'OK',
                                onPress: () => router.push('/login'),
                            },
                        ]
                    );
                }
            } else {
                if (activeTab === 'tip') {
                    router.push({
                        pathname: '/write',
                        params: {
                            writeType: 'tip',
                        },
                    });
                } else {
                    console.log('here is to campaignWrite!');
                    router.push({
                        pathname: '/write',
                        params: {
                            writeType: 'campaign',
                        },
                    });
                }
            }
        } else {
            Alert.alert(
                'Login Required',
                'You are not logged in. Move to login page?',
                [
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => router.push('/login'),
                    },
                ]
            );
        }
    };

    return (
        <TouchableOpacity onPress={handlePlusClick}>
            <View style={styles.container}>
                <View style={styles.circle}>
                    <Entypo name="plus" size={40} color="white" />
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 20, // adjust as needed
        right: 16, // adjust as needed
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    circle: {
        width: 76,
        height: 76,
        backgroundColor: '#777777',
        borderRadius: 38, // half of width/height
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, // for Android shadow
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: 32,
        // Note: You would need to link and use 'Font Awesome 6 Sharp' in React Native.
        // The following line is a placeholder and might not work directly.
        fontWeight: '900',
    },
});

export default React.memo(Plus);
