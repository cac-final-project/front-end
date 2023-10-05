import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

interface ImageListProps {
    post: Post;
}

const ImageListComponent: React.FC<ImageListProps> = ({ post }) => {
    return (
        <View style={styles.imageList}>
            {post.imageUrls?.map((item) => (
                <Image
                    key={item}
                    source={{
                        uri: item,
                    }}
                    style={styles.image}
                ></Image>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    imageList: {
        flex: 1,
        borderRadius: 8,
        // overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
        marginBottom: 8,
    },
});

const ImageList = React.memo(ImageListComponent);

export default ImageList;
