import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    GestureResponderEvent,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { postStyles } from '@/styles/post';
import { formatDate } from '@/utils/getDate';
import { updateVote } from '@/api/index';

const Post: React.FC<Post> = ({
    id,
    type,
    author,
    title,
    content,
    voteCount: initialVoteCount,
    isVoted: initialIsVoted,
    lat,
    lon,
    createdAt,
}) => {
    const router = useRouter();

    const [voteCount, setVoteCount] = useState(initialVoteCount);
    const [isVoted, setIsVoted] = useState(initialIsVoted);

    const handlePostClick = () => {
        router.push('/postDetail');
    };

    const handleVoteClick = async (
        e: GestureResponderEvent,
        vote: 'up' | 'down'
    ) => {
        e.stopPropagation();

        let newVoteCount = voteCount;
        if (isVoted === vote) {
            alert('You have voted already!');
            return;
        } else if (!isVoted) {
            newVoteCount = vote === 'up' ? voteCount + 1 : voteCount - 1;
        } else if (isVoted === 'up' && vote === 'down') {
            newVoteCount = voteCount - 2;
        } else if (isVoted === 'down' && vote === 'up') {
            newVoteCount = voteCount + 2;
        }

        setVoteCount(newVoteCount);
        setIsVoted(vote); // set vote state

        try {
            const response = await updateVote({ postId: id, vote });
            // Optionally: handle response here
        } catch (error) {
            // If API call fails, revert the vote
            alert('Error updating vote. Please try again.');
            setVoteCount(initialVoteCount);
            setIsVoted(initialIsVoted);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={handlePostClick}>
            <View style={postStyles.postContainer}>
                <View style={postStyles.leftBox}>
                    <View style={postStyles.tipContainer}>
                        <Text style={postStyles.tagText}>
                            {type === 'tip' ? 'Tip' : 'Campaign'}
                        </Text>
                    </View>
                    <Text style={postStyles.postTitle}>{content}</Text>
                    <Text style={postStyles.postDate}>
                        {formatDate(createdAt)}
                    </Text>
                </View>
                <View style={postStyles.rightBox}>
                    <View style={postStyles.rightBoxVoteContainer}>
                        <TouchableOpacity
                            onPress={(e) => handleVoteClick(e, 'up')}
                        >
                            <AntDesign name="up" size={26} color="black" />
                        </TouchableOpacity>
                        <Text>{voteCount}</Text>
                        <TouchableOpacity
                            onPress={(e) => handleVoteClick(e, 'down')}
                        >
                            <AntDesign name="down" size={26} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default Post;
