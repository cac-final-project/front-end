import React, { useMemo } from 'react';
import { StyleSheet, SafeAreaView, View, Text } from 'react-native';
import { getIcon } from '@/utils';

interface CustomOverlayProps {
    resource: TResource | null;
}

const CustomOverlay: React.FC<CustomOverlayProps> = ({ resource }) => {
    if (!resource) return null;

    const formattedDistance = useMemo(() => {
        return parseFloat(resource.distance.toString()).toFixed(2);
    }, [resource.distance]);

    return (
        <View style={styles.overlay}>
            <View style={styles.contentContainer}>
                <View style={styles.iconWrapper}>
                    {getIcon(resource.amenity)}
                </View>
                <View style={styles.detailContainer}>
                    <View>
                        <Text style={styles.streetName}>
                            {resource.address}
                        </Text>
                        <Text style={styles.distance}>
                            {formattedDistance}m
                        </Text>
                    </View>
                    <View style={styles.tagRow}>
                        {resource?.tags?.map((item, idx) => {
                            return (
                                <View key={idx} style={styles.tag}>
                                    <Text style={styles.tagText}>{item}</Text>
                                </View>
                            );
                        })}
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        bottom: 50,
        left: 10,
        right: 10,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconWrapper: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    detailContainer: {
        flex: 1,
        marginLeft: 8,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    streetName: {
        color: '#2B2B2B',
        fontSize: 15,
        letterSpacing: 0.45,
    },
    distance: {
        color: '#2B2B2B',
        fontSize: 13,
        letterSpacing: 0.39,
    },
    tagRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 8,
    },
    tag: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8, // margin for space between tags horizontally
        marginBottom: 8, // margin for space between tags vertically when they wrap to the next line
    },
    tagText: {
        color: '#2B2B2B',
        fontSize: 13,
        letterSpacing: 0.39,
    },
});

export default CustomOverlay;
