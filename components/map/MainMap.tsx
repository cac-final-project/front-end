import React, { useState, useEffect, useMemo } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Animated, Easing } from 'react-native';
import { getIcon } from '@/utils/index';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface MainMapProps {
    resourcesArr: TResource[];
    setSelected: (resource: TResource | null) => void; // Adding the setSelected function prop
}

const MainMap: React.FC<MainMapProps> = ({ resourcesArr, setSelected }) => {
    // current location
    const [location, setLocation] = useState({
        lat: 30.270409,
        lon: -97.744708,
    });

    const getMainLocation = async () => {
        try {
            const lat = await AsyncStorage.getItem(KEYS_AND_DEFAULT.lat[0]);
            const lon = await AsyncStorage.getItem(KEYS_AND_DEFAULT.lon[0]);
            setLocation({ lat: Number(lat), lon: Number(lon) });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getMainLocation();
    }, []);

    const initialRegion = useMemo(() => {
        const latitudeDelta =
            resourcesArr[resourcesArr.length - 1].distance * 0.00003;
        const longitudeDelta =
            resourcesArr[resourcesArr.length - 1].distance * 0.00003;

        return {
            latitude: location.lat,
            longitude: location.lon,
            latitudeDelta,
            longitudeDelta,
        };
    }, [location, resourcesArr]);

    // marker animation
    const animatedValue = useState(new Animated.Value(0))[0];

    useEffect(() => {
        Animated.loop(
            Animated.timing(animatedValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear,
                useNativeDriver: false,
            })
        ).start();
    }, []);

    const borderColor = animatedValue.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: ['red', 'yellow', 'green', 'blue', 'red'],
    });

    return (
        <MapView
            initialRegion={initialRegion}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            onPress={() => setSelected(null)}
        >
            <Marker
                key={'me'}
                coordinate={{
                    latitude: location.lat,
                    longitude: location.lon,
                }}
                title={'Me!'}
                description={'Current Location'}
                onPress={() => setSelected(null)}
            />
            {resourcesArr.map((resource: TResource) => (
                <Marker
                    key={resource.id}
                    coordinate={{
                        latitude: resource.lat,
                        longitude: resource.lon,
                    }}
                    title={resource.address}
                    description={resource.amenity}
                    onPress={() => setSelected(resource)}
                >
                    <Animated.View
                        style={[
                            styles.animatedView,
                            { borderColor: borderColor },
                        ]}
                    >
                        {getIcon(resource.amenity)}
                    </Animated.View>
                </Marker>
            ))}
        </MapView>
    );
};

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
    animatedView: {
        borderWidth: 2,
        borderRadius: 50,
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default React.memo(MainMap);
