import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Foundation } from '@expo/vector-icons';

interface LocationProps {
    handleSetIsLocationOpen: () => void;
    writeType: 'tip' | 'campaign';
    addressName: string;
}

const Location: React.FC<LocationProps> = ({
    handleSetIsLocationOpen,
    writeType,
    addressName,
}) => {
    const [location, setLocation] = useState('select location');

    const handleLocation = async () => {
        const retrievedNeighborhood = await AsyncStorage.getItem(
            KEYS_AND_DEFAULT.neighborhood[0]
        );
        setLocation(retrievedNeighborhood!);
    };

    useEffect(() => {
        if (writeType === 'tip') {
            handleLocation();
        }
    }, [writeType]);

    return (
        <TouchableOpacity onPress={handleSetIsLocationOpen}>
            <View style={styles.InputWrapper}>
                <View style={styles.iconWrapper}>
                    <Foundation name="marker" size={24} color="black" />
                </View>
                <Text style={styles.categoryLocationTitle}>Location</Text>
                <View style={styles.locationContainer}>
                    <Text
                        numberOfLines={2}
                        ellipsizeMode="tail"
                        style={styles.locationText}
                    >
                        {addressName ? addressName : location}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    InputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    iconWrapper: {
        width: 30,
        alignItems: 'center',
    },
    categoryLocationTitle: {
        marginLeft: 4,
        marginRight: 12,
        color: '#4D4D4D',
        fontSize: 13,
        fontWeight: '400',
    },
    locationContainer: {},
    locationText: {
        color: 'black',
        fontWeight: '600',
        fontSize: 13,
    },
});

export default Location;
