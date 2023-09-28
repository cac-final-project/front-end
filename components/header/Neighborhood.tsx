import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import { useState, useEffect } from 'react';

const Neighborhood = () => {
    const [neighborhood, setNeighborhood] = useState(
        KEYS_AND_DEFAULT.neighborhood[1]
    );

    const handleStorage = async () => {
        const neighborhood = await AsyncStorage.getItem(
            KEYS_AND_DEFAULT.neighborhood[0]
        );
        setNeighborhood(neighborhood!);
    };

    useEffect(() => {
        handleStorage();
    }, []);
    return (
        <SafeAreaView style={styles.centerBox}>
            <FontAwesome5
                name="map-marker"
                size={24}
                color="black"
                style={styles.icon}
            />
            <Text style={styles.text}>{neighborhood}</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    centerBox: {
        backgroundColor: '#E7E7E8',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
        flexDirection: 'row', // display children side by side
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        marginRight: 10, // space between icon and text
    },
    text: {
        color: 'black',
        fontSize: 18,
    },
});

export default Neighborhood;
