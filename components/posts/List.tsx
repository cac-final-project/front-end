import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import Post from './Post';

interface ListProps {
    posts: Post[] | [];
}

const List: React.FC<ListProps> = ({ posts }) => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {posts?.map((post, idx) => {
                    return <Post key={idx} postId={idx} {...post} />;
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    profileTopContainer: {
        alignItems: 'center',
    },
    bioContainer: {},
    activitiesContainer: {},
});

export default List;
