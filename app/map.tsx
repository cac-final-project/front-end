import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'expo-router';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import MainMap from '@/components/map/MainMap';
import CustomOverlay from '@/components/map/CustomOverlay';
import { Weather } from '@/components/index/index';

const map = () => {
    // resource items
    const { resources } = useSearchParams();
    const resourcesArr = useMemo(
        () => JSON.parse(resources as string) as TResource[],
        [resources]
    );
    // marker for customOverlay
    const [selected, setSelected] = useState<TResource | null>(resourcesArr[0]);

    return (
        <SafeAreaView style={styles.container}>
            <Weather />
            <MainMap resourcesArr={resourcesArr} setSelected={setSelected} />
            <CustomOverlay resource={selected} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default map;
