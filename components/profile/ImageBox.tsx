import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

type ImageBoxProps = {
    imageUrl?: string | null;
};

const ImageBox: React.FC<ImageBoxProps> = ({ imageUrl }) => {
    return (
        <View style={styles.container}>
            {imageUrl ? (
                <Image source={{ uri: imageUrl }} style={styles.image} />
            ) : (
                <View style={styles.image} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundColor: '#D9D9D9',
    },
});

export default ImageBox;
