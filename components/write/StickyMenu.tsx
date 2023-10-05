import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';

interface StickMenuProps {
    pickImage: () => void;
}

const StickyMenu: React.FC<StickMenuProps> = ({ pickImage }) => {
    return (
        <View style={styles.stickyMenu}>
            <TouchableOpacity onPress={pickImage}>
                <Feather name="image" size={28} color="#8E8E8E" />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    stickyMenu: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: '#F3F3F3',
        position: 'sticky', // This will fix the position of the menu
        bottom: 0, // This will position the menu at the bottom
        left: 0,
        right: 0,
        borderTopWidth: 1,
        borderColor: '#E0E0E0',
    },
});

export default StickyMenu;
