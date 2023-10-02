import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface TagProps {
    tag: string;
    handleTagClick: (tag: string) => void; // Change the type to a function signature
    selectedTag: string;
}

const Tag: React.FC<TagProps> = ({ tag, handleTagClick, selectedTag }) => {
    const styles = React.useMemo(
        () => getStyles(tag === selectedTag),
        [tag, selectedTag]
    );

    const handleTagPress = React.useCallback(() => {
        if (tag === selectedTag) {
            handleTagClick(''); // If the tag is already selected, deselect it.
        } else {
            handleTagClick(tag); // Else set the clicked tag as the selected tag.
        }
    }, [tag, handleTagClick, selectedTag]);

    return (
        <TouchableOpacity onPress={handleTagPress} style={styles.tagsContainer}>
            <Text style={styles.text}>{tag}</Text>
        </TouchableOpacity>
    );
};

const getStyles = (isSelected: boolean) =>
    StyleSheet.create({
        tagsContainer: {
            paddingHorizontal: 10,
            paddingVertical: 4,
            backgroundColor: '#E3E3E3',
            marginHorizontal: 5,
            borderRadius: 8,
            borderWidth: isSelected ? 1 : 0, // If the tag is selected, set borderWidth to 2, else 0
            borderColor: isSelected ? 'black' : 'transparent', // If the tag is selected, set borderColor to black, else transparent
        },
        text: {
            color: '#2B2B2B',
            fontSize: 13,
            fontWeight: '400',
        },
    });

export default Tag;
