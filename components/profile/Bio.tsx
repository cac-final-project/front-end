import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

type BioProps = {
    bio?: string | null;
};

const Bio: React.FC<BioProps> = ({ bio }) => {
    return (
        <View style={styles.bioContainer}>
            <Text style={styles.bioTitle}>Introduction</Text>
            <View style={styles.bioTextContainer}>
                <Text>{bio}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bioContainer: {
        marginVertical: 24,
    },
    bioTitle: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: '#2B2B2B',
        marginBottom: 8,
    },
    bioTextContainer: {
        padding: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    bioText: {},
});

export default Bio;
