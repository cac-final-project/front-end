import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const Plus: React.FC = () => {
    const router = useRouter();

    const handlePlusClick = () => {
        router.push('/write');
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

export default Plus;
