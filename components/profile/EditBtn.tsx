import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const EditBtn: React.FC = () => {
    const handlePress = () => {
        console.log('Button pressed!'); // You can replace this with your own logic
    };
    return (
        <TouchableOpacity onPress={handlePress} style={styles.buttonCotnainer}>
            <Text style={styles.btnText}>Edit profile</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonCotnainer: {
        marginTop: 8,
        alignItems: 'center',
        backgroundColor: '#D6D6D6',
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 4,
    },
    btnText: {
        color: '#636363',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 0.3,
    },
});

export default EditBtn;
