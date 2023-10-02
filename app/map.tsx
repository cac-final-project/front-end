import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'expo-router';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import MainMap from '@/components/map/MainMap';
import CustomOverlay from '@/components/map/CustomOverlay';
import { Weather } from '@/components/index/index';
import LoadingSpinner from '@/components/spinner';

const map = () => {
    // resource items
    const { resources } = useSearchParams();
    const [isLoading, setIsLoading] = useState(true);

    const resourcesArr = useMemo(() => {
        setIsLoading(true); // set loading true when starting processing
        const result = JSON.parse(resources as string) as TResource[];
        setIsLoading(false); // set loading false after processing
        return result;
    }, [resources]);

    // marker for customOverlay
    const [selected, setSelected] = useState<TResource | null>(resourcesArr[0]);

    return (
        <SafeAreaView style={styles.container}>
            {isLoading ? (
                <LoadingSpinner
                    visible={isLoading}
                    spinnerContent="Loading..."
                />
            ) : (
                <>
                    <Weather />
                    <MainMap
                        resourcesArr={resourcesArr}
                        setSelected={setSelected}
                    />
                    <CustomOverlay resource={selected} />
                </>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default map;
