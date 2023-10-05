import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface CategoryListProps {
    handleCategoryOpen: () => void;
    tags: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({
    handleCategoryOpen,
    tags,
}) => {
    return (
        <TouchableOpacity onPress={handleCategoryOpen}>
            <View style={styles.InputWrapper}>
                <View style={styles.iconWrapper}>
                    <Feather name="menu" size={24} color="black" />
                </View>
                <Text style={styles.categoryLocationTitle}>Category</Text>
                <View style={styles.tagContainer}>
                    {tags.length !== 0 &&
                        tags.map((item, idx) => {
                            return (
                                <View style={styles.tag}>
                                    <Text key={item} style={styles.tagText}>
                                        {item}
                                    </Text>
                                </View>
                            );
                        })}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    InputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconWrapper: {
        width: 30,
        alignItems: 'center',
    },
    categoryLocationTitle: {
        marginLeft: 4,
        marginRight: 12,
        color: '#4D4D4D',
        fontSize: 13,
        fontWeight: '400',
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
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

export default CategoryList;
