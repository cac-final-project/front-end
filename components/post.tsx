import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { postStyles } from '@/styles/post';

const Post: React.FC<Post> = ({
    id,
    type,
    author,
    title,
    content,
    voteCount,
    lat,
    lon,
    createdAt,
}) => {
    return (
        <View style={postStyles.postContainer}>
            <View style={postStyles.leftBox}>
                <View style={postStyles.tipContainer}>
                    <Text style={postStyles.tagText}>Tip</Text>
                </View>

                <Text style={postStyles.postTitle}>
                    Staying Cool on the Street: A tip from experience
                </Text>

                <Text style={postStyles.postDate}>2023.09.20</Text>
            </View>
            <View style={postStyles.rightBox}>
                <View style={postStyles.rightBoxVoteContainer}>
                    <AntDesign name="up" size={26} color="black" />
                    <Text>28</Text>
                    <AntDesign name="down" size={26} color="black" />
                </View>
            </View>
        </View>
    );
};

export default Post;
