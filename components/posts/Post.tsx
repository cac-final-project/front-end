import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    GestureResponderEvent,
    TouchableOpacity,
} from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { formatDate } from '@/utils/getDate';
import { updateVote } from '@/api/index';

interface PostProps extends Post {
    postId: number;
}

declare global {
    type Vote = 'up' | 'down';
}

const Post: React.FC<PostProps> = ({
    postId,
    author,
    content,
    createdAt,
    voteCount: initialVoteCount,
    id,
    isVoted: initialIsVoted,
}) => {
    const [voteCount, setVoteCount] = useState(initialVoteCount);
    const [isVoted, setIsVoted] = useState(initialIsVoted);

    const router = useRouter();

    const handlePostClick = () => {
        router.push('/');
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
            <View style={styles.postContainer}>
                <View style={styles.leftBox}>
                    <View style={styles.leftTopHeader}>
                        <View style={styles.profileBox}>
                            <FontAwesome5 name="user" size={20} color="black" />
                        </View>
                        <View style={styles.leftTopHeaderRight}>
                            <Text>@{author}</Text>
                            {postId === 0 && (
                                <View style={styles.popularTag}>
                                    <Text style={styles.popularText}>
                                        Popular
                                    </Text>
                                </View>
                            )}
                        </View>
                    </View>
                    <View>
                        <Text style={styles.contentTitle}>{content}</Text>
                    </View>
                    <View>
                        <Text>{formatDate(createdAt)}</Text>
                    </View>
                </View>
                <View style={styles.rightBox}>
                    <View style={styles.rightBoxVoteContainer}>
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

const styles = StyleSheet.create({
    postContainer: {
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        gap: 8,
    },
    leftBox: {
        flex: 7,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
    },
    rightBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    profileBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center', // icon to center
        marginRight: 5,
        width: 45,
    },
    leftTopHeader: {
        flexDirection: 'row',
    },
    leftTopHeaderRight: {
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center',
    },
    popularTag: {
        paddingHorizontal: 0,
        paddingVertical: 4,
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        alignItems: 'center',
    },
    popularText: {
        color: '#2B2B2B',
        fontSize: 10,
        fontWeight: '700',
    },
    contentTitle: {
        color: '#2B2B2B',
        fontSize: 15,
        fontWeight: '700',
    },
    date: {
        color: '#2B2B2B',
        fontSize: 10,
        fontWeight: '400',
    },
    rightBoxVoteContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Post;
