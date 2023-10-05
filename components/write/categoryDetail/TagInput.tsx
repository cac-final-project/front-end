import React, { SetStateAction, Dispatch } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import { Feather, Foundation } from '@expo/vector-icons';

interface TagInputProps {
    tags: string[];
    deleteTag: (item: string) => void;
    currentTag: string;
    setCurrentTag: Dispatch<SetStateAction<string>>;
    handleSetTags: () => void;
}

const TagInput: React.FC<TagInputProps> = ({
    tags,
    deleteTag,
    currentTag,
    setCurrentTag,
    handleSetTags,
}) => {
    return (
        <View style={styles.inputTagsContainer}>
            {tags.length !== 0 &&
                tags.map((item, idx) => {
                    return (
                        <TouchableOpacity
                            key={item}
                            onPress={() => deleteTag(item)}
                        >
                            <View style={styles.tag}>
                                <Text key={item} style={styles.tagText}>
                                    {item}
                                </Text>
                                <Feather name="x" size={14} color="black" />
                            </View>
                        </TouchableOpacity>
                    );
                })}
            <TextInput
                value={currentTag}
                onChangeText={setCurrentTag}
                onSubmitEditing={handleSetTags}
                returnKeyType="done"
                placeholder="Type a tag and press Enter"
                style={{ flexShrink: 1 }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputTagsContainer: {
        marginTop: 8,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    tag: {
        marginRight: 8,
        marginBottom: 4,
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tagText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '400',
        marginRight: 3,
    },
});

export default TagInput;
