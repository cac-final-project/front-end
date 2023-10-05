import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    GestureResponderEvent,
    TouchableOpacity,
    Image,
} from 'react-native';
import { FontAwesome5, AntDesign } from '@expo/vector-icons';
import { formatDate } from '@/utils/getDate';
import { updateVote } from '@/api/index';

interface PostProps {
    postId: number;
    profile_img: string | null;
    author: string;
    popularId: string;
    content: string;
    createdAt: string;
    voteCount: number;
    isVoted: 'up' | 'down' | null;
}

const PostComponent: React.FC<PostProps> = ({
    postId,
    profile_img,
    author,
    popularId,
    content,
    createdAt,
    voteCount: initialVoteCount,
    isVoted: initialIsVoted,
}) => {
    const [voteCount, setVoteCount] = useState(initialVoteCount);
    const [isVoted, setIsVoted] = useState(initialIsVoted);

    const styles = React.useMemo(() => getStyles(profile_img), [profile_img]);
    const router = useRouter();

    const handleProfileClick = (e: GestureResponderEvent) => {
        e.stopPropagation();
        router.push({
            pathname: '/profile',
            params: {
                author: author,
            },
        });
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
            const response = await updateVote({ postId: postId, vote });
            // Optionally: handle response here
        } catch (error) {
            // If API call fails, revert the vote
            alert('Error updating vote. Please try again.');
            setVoteCount(initialVoteCount);
            setIsVoted(initialIsVoted);
        }
    };

    return (
        <TouchableWithoutFeedback>
            <View style={styles.postContainer}>
                <View style={styles.leftBox}>
                    <View style={styles.leftTopHeader}>
                        <TouchableOpacity>
                            {profile_img ? (
                                <View style={styles.profileBox}>
                                    <Image
                                        source={{ uri: profile_img }}
                                        style={styles.image}
                                    />
                                </View>
                            ) : (
                                <View style={styles.profileBox}>
                                    <FontAwesome5
                                        name="user"
                                        size={20}
                                        color="black"
                                    />
                                </View>
                            )}
                        </TouchableOpacity>
                        <View style={styles.leftTopHeaderRight}>
                            <TouchableOpacity
                                onPress={(e) => handleProfileClick(e)}
                            >
                                <Text>@{author}</Text>
                            </TouchableOpacity>
                            {popularId === '0' && (
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
                    <View style={styles.dateContainer}>
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

function getStyles(profile_img: string | null) {
    return StyleSheet.create({
        postContainer: {
            flexDirection: 'row',
            backgroundColor: 'white',
            borderRadius: 8,
            gap: 8,
        },
        leftBox: {
            flex: 7,
            justifyContent: 'space-between',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 8,
        },
        leftTopHeader: {
            flexDirection: 'row',
        },
        rightBox: {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            paddingVertical: 8,
        },
        profileBox: {
            backgroundColor: 'rgba(0, 0, 0, 0.20)',
            padding: profile_img ? 0 : 10,
            borderRadius: 8,
            alignItems: 'center', // icon to center
            justifyContent: 'center',
            marginRight: 5,
            width: 45,
            height: 45,
        },
        image: {
            width: '100%',
            height: '100%',
            backgroundColor: '#D9D9D9',
            borderRadius: 8,
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
        rightBoxVoteContainer: {
            alignItems: 'center',
            justifyContent: 'center',
        },
        dateContainer: {
            marginBottom: 8,
        },
    });
}

const Post = React.memo(PostComponent);

export default Post;
