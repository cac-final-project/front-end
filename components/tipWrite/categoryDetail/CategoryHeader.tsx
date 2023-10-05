import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CategoryHeader: React.FC = () => {
    return (
        <View style={styles.categoryPageTitle}>
            <Feather
                style={styles.categoryPageTitleIcon}
                name="menu"
                size={24}
                color="black"
            />
            <Text style={styles.categoryPageTitleText}>Selected category</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    categoryPageTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    categoryPageTitleIcon: {
        width: 30,
        alignItems: 'center',
        marginRight: 8,
    },
    categoryPageTitleText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default CategoryHeader;
