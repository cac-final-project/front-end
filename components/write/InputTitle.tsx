import { View, Text, StyleSheet, TextInput } from 'react-native';
import React from 'react';

interface InputTitleProps {
    title: string;
    onChange: (text: string) => void;
}

const InputTitle: React.FC<InputTitleProps> = ({ title, onChange }) => {
    return (
        <View style={styles.inputTitleWrapper}>
            <TextInput
                placeholder="Untitled"
                placeholderTextColor={'#B9B9B9'}
                autoFocus={true}
                multiline={true}
                numberOfLines={2} // You can adjust this as needed
                style={[styles.inputTitleText, { height: 50 }]} // Increase height as needed
                value={title}
                onChangeText={onChange}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputTitleWrapper: {
        marginBottom: 16,
    },
    inputTitleText: {
        fontSize: 20,
        fontWeight: '700',
    },
});

export default InputTitle;
