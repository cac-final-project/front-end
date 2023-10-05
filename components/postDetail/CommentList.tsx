import React, { useMemo } from 'react';
import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    Image,
    GestureResponderEvent,
    TouchableWithoutFeedback,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { formatDate } from '@/utils/getDate';

declare global {
    interface IComment {
        id: number;
        post_id: number;
        user_id: number;
        username: string;
        content: string;
        profile_img: string | null;
        voteCount: number;
        createdAt: string;
    }
}

interface CommentListProps {
    comments: IComment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
    const router = useRouter();

    const handleProfileClick = (e: GestureResponderEvent, author: string) => {
        e.stopPropagation();
        router.push({
            pathname: '/profile',
            params: {
                author: author,
            },
        });
    };

    const renderedComments = useMemo(() => {
        return comments?.map((comment) => (
            <View key={comment.id} style={styles.commentBox}>
                <TouchableWithoutFeedback
                    onPress={(e) => handleProfileClick(e, comment.username)}
                >
                    <View style={styles.profileArea}>
                        <View style={styles.profilePictureContainer}>
                            {comment.profile_img ? (
                                <Image
                                    style={styles.profilePlaceholder}
                                    source={{
                                        uri: comment.profile_img /*profile picture URI here*/,
                                    }}
                                />
                            ) : (
                                <FontAwesome5
                                    name="user"
                                    style={styles.userIcon}
                                />
                            )}
                        </View>
                        <Text style={styles.username}>@JohnDoe</Text>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={styles.date}>{formatDate(comment.createdAt)}</Text>
                <Text style={styles.commentText}>{comment.content}</Text>
            </View>
        ));
    }, [comments]);

    return <View>{comments?.length > 0 && renderedComments}</View>;
};

const styles = StyleSheet.create({
    commentBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 8,
        padding: 8,
        marginBottom: 8,
    },
    profileArea: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 4,
    },
    profilePictureContainer: {
        width: 32,
        height: 32,
        backgroundColor: '#E3E3E3',
        borderRadius: 8,
        marginRight: 8,
        position: 'relative',
    },
    profilePlaceholder: {
        width: 32,
        height: 32,
        position: 'absolute',
        top: 0,
        left: 0,
    },
    userIcon: {
        fontSize: 20,
        color: '#171717',
        textAlign: 'center',
        width: '100%',
        lineHeight: 32, // This should vertically center the icon
    },
    username: {
        color: '#171717',
        fontSize: 14,
        fontWeight: '400',
    },
    date: {
        color: '#171717',
        fontSize: 10,
        fontWeight: '400',
        letterSpacing: 0.3,
        alignSelf: 'stretch',
    },
    commentText: {
        color: '#171717',
        fontSize: 13,
        fontWeight: '400',
        letterSpacing: 0.39,
    },
});

export default CommentList;
