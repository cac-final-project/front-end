import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { getIcon } from '@/utils';

declare global {
    type Amenity =
        | 'map'
        | 'toilets'
        | 'drinking_water'
        | 'bench'
        | 'waste_disposal'
        | 'shower';
    interface AmenityProps {
        amenity: Amenity;
    }
}

const Amenity: React.FC<AmenityProps> = ({ amenity }) => {
    const styles = React.useMemo(() => getStyles({ amenity }), [amenity]);

    return (
        <View style={styles.outerContainer}>
            <View style={styles.iconContainer}>{getIcon(amenity)}</View>
            <Text style={styles.labelText}>
                {amenity === 'map' ? 'See all in amp' : amenity}
            </Text>
        </View>
    );
};
function getStyles({ amenity }: AmenityProps) {
    return StyleSheet.create({
        outerContainer: {
            marginRight: 8,
            padding: 4,
            backgroundColor: '#EFEFEF',
            borderRadius: 8,
            borderWidth: amenity === 'map' ? 2 : 0,
            borderColor: '#8A8A8A',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            minWidth: 100,
            minHeight: 65,
        },
        iconContainer: {
            marginTop: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        labelText: {
            color: '#2B2B2B',
            fontSize: 12,
            fontWeight: '400',
            letterSpacing: 1.2,
        },
    });
}

export default Amenity;
