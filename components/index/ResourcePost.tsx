import React, { useMemo, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';
import { getIcon } from '@/utils';

interface ResourcePostProps {
    data: TResource;
}

const ResourcePost: React.FC<ResourcePostProps> = ({ data }) => {
    const router = useRouter();

    const handleNavigate = () => {
        router.push({
            pathname: '/map',
            params: {
                resources: JSON.stringify([data]),
            },
        });
    };

    const formattedDistance = useMemo(() => {
        return parseFloat(data.distance.toString()).toFixed(2);
    }, [data.distance]);

    const streetName = useMemo(() => {
        return data.address;
    }, [data.address]);

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <View style={styles.iconWrapper}>{getIcon(data.amenity)}</View>
                <View style={styles.detailsContainer}>
                    <View style={styles.streetInfo}>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.streetName}>{streetName}</Text>
                            <Text style={styles.distance}>
                                {formattedDistance}m
                            </Text>
                        </View>
                        <TouchableOpacity onPress={handleNavigate}>
                            <AntDesign
                                name="right"
                                size={24}
                                color="black"
                                style={{ alignSelf: 'flex-start' }}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tagRow}>
                        {data.tags?.map((item, idx) => {
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
    container: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#DDDDDD',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    iconWrapper: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    detailsContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    streetInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    streetName: {
        color: '#2B2B2B',
        fontSize: 15,
        fontWeight: '700',
        letterSpacing: 0.45,
    },
    distance: {
        color: '#2B2B2B',
        fontSize: 13,
        fontWeight: '400',
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
        fontWeight: '400',
        letterSpacing: 0.39,
    },
});

export default ResourcePost;
