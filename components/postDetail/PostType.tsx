import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface PostTypeProps {
    post: Post;
}

const PostTypeComponent: React.FC<PostTypeProps> = ({ post }) => {
    return (
        <View style={styles.postTypeContainer}>
            <View style={styles.postType}>
                <Text style={styles.postTypeText}>{post?.type}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    postTypeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginBottom: 8,
    },
    postType: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: '#7A7A7A',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    postTypeText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'capitalize',
    },
});

const PostType = React.memo(PostTypeComponent);

export default PostType;
