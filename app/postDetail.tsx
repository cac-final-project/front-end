import React, { useState, useEffect, useCallback } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    TextInput,
} from 'react-native';
import { useSearchParams } from 'expo-router';
import { fetchPost, getAuthorProfile } from '@/api/index';
import { Spinner } from '@/components/index';
import PostType from '@/components/postDetail/PostType';
import ImageList from '@/components/postDetail/ImageList';
import Post from '@/components/postDetail/Post';
import TagList from '@/components/postDetail/TagList';
import CommentList from '@/components/postDetail/CommentList';

type TProfile = {
    bio?: string;
    profile_img?: string | null;
    first_name: string;
    last_name: string;
    username: string;
};

const postDetail = () => {
    const { post_id, popularId } = useSearchParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [post, setPost] = useState<Post>();
    const [postProfile, setPostProfile] = useState<TProfile>();

    const handleFetchPost = useCallback(async () => {
        try {
            const postResponse = await fetchPost({ postId: Number(post_id) });
            if (postResponse?.result) {
                const profileResponse = await getAuthorProfile({
                    author: postResponse.data.author,
                });
                if (profileResponse?.result) {
                    setPost(postResponse.data);
                    setPostProfile(profileResponse.data);
                }
            }
            setIsLoaded(true);
        } catch (error) {
            console.error('Error fetching post details:', error);
            setIsLoaded(true);
        }
    }, [post_id]);

    useEffect(() => {
        if (!isLoaded) {
            handleFetchPost();
        }
    }, [handleFetchPost, isLoaded]);
    if (isLoaded && post && postProfile) {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView style={styles.scrollViewContainer}>
                    <View style={styles.detailContainer}>
                        <PostType post={post} />

                        <Post
                            profile_img={postProfile?.profile_img!}
                            author={postProfile?.username}
                            popularId={String(popularId)}
                            content={post.content}
                            createdAt={post.createdAt}
                            voteCount={post.voteCount}
                            isVoted={post.isVoted}
                            postId={Number(post_id)}
                        />

                        <ImageList post={post} />

                        <View style={styles.contentContainer}>
                            <TextInput
                                style={styles.contentText}
                                multiline={true}
                                value={post?.content}
                                editable={false}
                            />
                        </View>
                        <TagList post={post} />
                        <View style={styles.commentsHeader}>
                            <Text style={styles.commentsHeaderTest}>
                                Comments (0)
                            </Text>
                        </View>
                        <CommentList comments={post.comments} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    } else {
        return <Spinner visible={!isLoaded} spinnerContent={'loading...'} />;
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContainer: {
        padding: 16,
    },
    detailContainer: {
        padding: 16,
        borderWidth: 1,
        borderColor: '#E3E3E3',
    },

    contentContainer: {
        flex: 1,
        padding: 8,
        backgroundColor: '#F0F0F0',
        borderRadius: 8,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    contentText: {
        color: '#171717',
        fontSize: 13,
        fontWeight: '400',
        letterSpacing: 0.39,
        textAlign: 'justify',
        width: '100%',
    },

    commentsHeader: {
        marginVertical: 8,
    },
    commentsHeaderTest: {
        color: '#171717',
        fontSize: 12,
        fontWeight: '700',
    },
});

export default postDetail;
