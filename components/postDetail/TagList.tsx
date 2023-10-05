import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface TagListProps {
    post: Post;
}

const TagListComponent: React.FC<TagListProps> = ({ post }) => {
    return (
        <View style={styles.tagsContainer}>
            {post.tagItems?.map((item) => (
                <View key={item} style={styles.tag}>
                    <Text style={styles.tagText}>{item}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        marginVertical: 8,
    },
    tag: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 4,
        marginRight: 8,
    },
    tagText: {
        color: '#171717',
        fontSize: 10,
        fontWeight: '700',
        textTransform: 'capitalize',
    },
});

const TagList = React.memo(TagListComponent);

export default TagList;
