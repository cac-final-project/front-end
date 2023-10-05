import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { exampleTags } from '@/components/write/exampleTags';

const RecommendList: React.FC = () => {
    return (
        <View style={styles.recommendTagContainer}>
            {exampleTags.map((item) => (
                <View key={item}>
                    <View style={styles.recommendTag}>
                        <Text style={styles.tagText}>{item}</Text>
                    </View>
                    <View style={styles.recommendLine}></View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    recommendTagContainer: {
        flexDirection: 'column',
        marginTop: 12,
    },
    recommendLine: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        marginVertical: 12,
    },
    recommendTag: {
        marginRight: 8,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tagText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '400',
        marginRight: 3,
    },
});

export default RecommendList;
