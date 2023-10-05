import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';

interface ContentInputProps {
    setInputFocused: (isInputFocused: boolean) => void;
    content: string;
    onChange: (text: string) => void;
}

const ContentInput: React.FC<ContentInputProps> = ({
    setInputFocused,
    content,
    onChange,
}) => {
    return (
        <View>
            <TextInput
                value={content}
                onChangeText={onChange}
                style={styles.multiInputContainer}
                placeholderTextColor={'#8A8A8A'}
                multiline={true}
                scrollEnabled={true}
                onFocus={() => setInputFocused(true)}
                onBlur={() => setInputFocused(false)}
                placeholder="Tap here to continue..."
            />
        </View>
    );
};

const styles = StyleSheet.create({
    multiInputContainer: {
        maxHeight: 150,
        // paddingBottom: 10,
    },
});

export default ContentInput;
