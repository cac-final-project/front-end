import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Spinner } from '@/components/index';
import { Weather } from '@/components/index/index';
import Tab from '@/components/posts/Tab';
import List from '@/components/posts/List';
import Plus from '@/components/posts/Plus';
import { fetchPosts } from '@/api/index';

declare global {
    type Post = {
        id: number;
        type: PostType;
        author: string;
        profile_img: string | null;
        title: string;
        content: string;
        voteCount: number;
        isVoted: 'up' | 'down' | null;
        lat: number | null;
        lon: number | null;
        createdAt: string;
    };
    type PostType = 'tip' | 'campaign';
}

const posts = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeTab, setActiveTab] = useState<PostType>('tip');
    const [tips, setTips] = useState<Post[] | []>();
    const [campaign, setCampaign] = useState<Post[] | []>();

    const handleSetActiveTab = async (activeTab: PostType) => {
        setActiveTab(activeTab);
        setIsLoaded(false);
        await handleFetchPosts();
    };

    const handleFetchPosts = async () => {
        const res = await fetchPosts();
        if (res?.result) {
            const wholePosts: Post[] = res.data;

            setTips(wholePosts.filter((item: Post) => item.type === 'tip'));

            setCampaign(
                wholePosts.filter((item: Post) => item.type === 'campaign')
            );
        }
        setIsLoaded(true);
    };

    // need to use reoil for this...
    useEffect(() => {
        handleFetchPosts();
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Spinner visible={!isLoaded} spinnerContent={'Loading...'} />
            {isLoaded && (
                <>
                    <Weather />
                    <Tab
                        activeTab={activeTab}
                        handleSetActiveTab={handleSetActiveTab}
                    />
                    {activeTab === 'tip' ? (
                        <List posts={tips!} />
                    ) : (
                        <List posts={campaign!} />
                    )}
                </>
            )}
            <Plus activeTab={activeTab} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: 'white',
    },
});

export default posts;
