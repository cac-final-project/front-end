import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

interface ImageList {
    selectedImages: string[];
    setSelectedImages: React.Dispatch<React.SetStateAction<string[]>>;
}

const ImageList: React.FC<ImageList> = ({
    selectedImages,
    setSelectedImages,
}) => {
    return (
        <ScrollView style={styles.imageScrollView}>
            <View style={styles.imageContainer}>
                {selectedImages.length > 0 &&
                    selectedImages.map((item) => {
                        return (
                            <View key={item} style={styles.imageWrapper}>
                                <Image
                                    source={{ uri: item }}
                                    style={styles.imageItem}
                                />
                                <TouchableOpacity
                                    style={styles.closeIcon}
                                    onPress={() =>
                                        setSelectedImages((prev) => {
                                            return prev.filter((prevItem) => {
                                                return prevItem !== item;
                                            });
                                        })
                                    }
                                >
                                    <Feather name="x" size={28} color="white" />
                                </TouchableOpacity>
                            </View>
                        );
                    })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    imageScrollView: {
        height: 900,
        marginTop: 16,
        marginHorizontal: 24,
    },
    imageContainer: {
        alignItems: 'center',
    },
    imageWrapper: {
        position: 'relative',
        width: '100%',
    },
    imageItem: {
        width: '100%',
        height: 160,
        resizeMode: 'cover',
        marginBottom: 16,
    },
    closeIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 15,
        padding: 5,
    },
});

export default ImageList;
