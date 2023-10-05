import React from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface HeaderProps {
    isCategoryOpen: boolean;
    handleCategoryOpen: () => void;
    handleSubmit: () => Promise<void>;
    writeType: 'tip' | 'campaign';
    isLocationOpen: boolean;
    handleSetIsLocationOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({
    isCategoryOpen,
    handleCategoryOpen,
    handleSubmit,
    writeType,
    isLocationOpen,
    handleSetIsLocationOpen,
}) => {
    const router = useRouter();

    const handleGoBack = () => {
        if (isCategoryOpen) {
            handleCategoryOpen();
        } else if (isLocationOpen) {
            handleSetIsLocationOpen();
        } else {
            router.push('/posts');
        }
    };

    let displayTitle = `Write ${writeType}`; // Default
    if (isCategoryOpen) {
        displayTitle = 'Category';
    } else if (isLocationOpen) {
        displayTitle = 'Drag marker!';
    }

    let postButtonText = 'Post'; // Default
    if (isCategoryOpen || isLocationOpen) {
        postButtonText = 'Done';
    }

    return (
        <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
                <TouchableOpacity
                    onPress={handleGoBack}
                    style={styles.closeButtonContainer}
                >
                    <Feather name="x" size={24} color="black" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>{displayTitle}</Text>
                </View>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.postButtonContainer}
                >
                    <Text style={styles.postButtonText}>{postButtonText}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 60,
        paddingBottom: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headerContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 16,
        paddingRight: 16,
        width: '100%',
        height: 40,
    },
    closeButtonContainer: {
        width: 24,
        height: 24,
        position: 'relative',
    },
    closeButtonText: {
        color: 'black',
        fontSize: 18,
        // fontFamily: 'Font Awesome 6 Sharp',
        fontWeight: '400',
        textAlign: 'center',
    },
    titleContainer: {
        padding: 8,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleText: {
        color: 'black',
        fontSize: 16,
        // fontFamily: 'Plus Jakarta Sans',
        fontWeight: '500',
        lineHeight: 24,
        letterSpacing: 0.16,
    },
    postButtonContainer: {
        padding: 8,
        borderRadius: 8,
        backgroundColor: '#969696',
        justifyContent: 'center',
        alignItems: 'center',
    },
    postButtonText: {
        color: 'white',
        fontSize: 14,
        // fontFamily: 'Plus Jakarta Sans',
        fontWeight: '700',
        letterSpacing: 0.42,
    },
});

export default Header;
