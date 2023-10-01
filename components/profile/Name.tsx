import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type NameProps = {
    first_name: string;
    last_name: string;
};

const Name: React.FC<NameProps> = ({ first_name, last_name }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.nameText}>{first_name} </Text>
            <Text style={styles.nameText}>{last_name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: 8,
    },
    nameText: {
        color: '#2B2B2B',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        letterSpacing: 0.64,
        flexWrap: 'wrap', // Corresponds to word-wrap: break-word in CSS
        // If you have the custom font installed in your project, add the fontFamily line.
        // fontFamily: 'Plus Jakarta Sans',
    },
});

export default Name;
