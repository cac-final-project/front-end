import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

interface ISpinner {
    visible: boolean;
    spinnerContent: string;
}

const CustomSpinner = ({ visible, spinnerContent }: ISpinner) => {
    if (!visible) return null;

    return (
        <View style={styles.spinnerContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.spinnerText}>{spinnerContent}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 8,
    },
    spinnerText: {
        marginLeft: 10,
    },
});

export default CustomSpinner;
