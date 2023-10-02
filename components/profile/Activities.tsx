import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Post from '../post';

type ActivitiesProps = { posts: Post[] };

const Activities: React.FC<ActivitiesProps> = ({ posts }) => {
    return (
        <View>
            <Text style={styles.activitiesTitle}>Activities</Text>

            {posts?.map((post, idx) => (
                <Post key={idx} {...post} />
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    activitiesTitle: {
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        color: '#2B2B2B',
        marginBottom: 8,
    },
    // scrollViewContainer: {
    //     height: 200,
    // },
});
export default Activities;
