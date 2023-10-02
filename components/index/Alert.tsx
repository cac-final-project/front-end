import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Alert: React.FC = () => {
    const router = useRouter();

    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleSeeMore = () => {
        router.push('/alert');
    };
    if (isOpen) {
        return (
            <View style={styles.container}>
                <View style={styles.alertHeader}>
                    <View style={styles.alertContent}>
                        <View style={styles.dateContainer}>
                            <Text style={styles.dateText}>July 15</Text>
                            <Text style={styles.timeText}>09:35 AM</Text>
                        </View>
                        <Text style={styles.alertText}>
                            Extreme Heat warning was issued.{'\n'}Stay out of
                            the sun, Drink plenty water!
                        </Text>
                    </View>
                    <TouchableOpacity
                        onPress={handleClose}
                        style={styles.closeContainer}
                    >
                        <FontAwesome name="close" size={12} color="black" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={handleSeeMore}
                    style={styles.seeMoreContainer}
                >
                    <Text style={styles.seeMoreText}>See more</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        <></>;
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#EEEEEE',
        borderRadius: 8,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        width: '100%',
    },
    alertContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginRight: 10,
    },
    dateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4,
        gap: 8,
    },
    dateText: {
        color: '#2B2B2B',
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    timeText: {
        color: '#2B2B2B',
        fontSize: 8,
        fontWeight: '700',
        letterSpacing: 0.8,
    },
    alertText: {
        color: '#2B2B2B',
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: 1.2,
    },
    closeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 16,
        height: 16,
    },
    seeMoreContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        paddingTop: 4,
    },
    seeMoreText: {
        color: '#848484',
        fontSize: 12,
        fontWeight: '400',
        textDecorationLine: 'underline',
        lineHeight: 18,
        letterSpacing: 1.2,
    },
});

export default Alert;
