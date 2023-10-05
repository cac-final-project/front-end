import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAddress } from '@/api/index';
import { generateSentence } from '@/utils/generateAddress';

interface IdraggableCoord {
    latitude: number;
    longitude: number;
}

interface MainMapProps {
    setAddress: React.Dispatch<React.SetStateAction<string>>;
    draggableCoord: IdraggableCoord;
    setDraggableCoord: React.Dispatch<React.SetStateAction<IdraggableCoord>>;
}

const MainMap: React.FC<MainMapProps> = ({
    setAddress,
    draggableCoord,
    setDraggableCoord,
}) => {
    const [initialLocation, setInitialLocation] = useState({
        lat: 30.270409,
        lon: -97.744708,
    });

    const getMainLocation = async () => {
        try {
            const lat = await AsyncStorage.getItem(KEYS_AND_DEFAULT.lat[0]);
            const lon = await AsyncStorage.getItem(KEYS_AND_DEFAULT.lon[0]);
            setInitialLocation({ lat: Number(lat), lon: Number(lon) });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMainLocation();
    }, []);

    const handleGetAddress = async () => {
        const res = await getAddress({
            lat: String(draggableCoord.latitude),
            lon: String(draggableCoord.longitude),
        });
        if (res?.result) {
            const data = res.data;
            const addressSentence = generateSentence(data);
            setAddress(addressSentence);
        }
    };

    useEffect(() => {
        handleGetAddress();
    }, [draggableCoord]);

    return (
        <MapView
            initialRegion={{
                latitude: initialLocation.lat,
                longitude: initialLocation.lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
        >
            <Marker
                draggable
                coordinate={draggableCoord}
                onDragEnd={(e) => setDraggableCoord(e.nativeEvent.coordinate)}
            />
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});

export default MainMap;
