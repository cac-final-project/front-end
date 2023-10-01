import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getProfile, fetchPosts } from '@/api/index';
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from 'react-native';
import { Spinner } from '@/components/index';
import {
    ImageBox,
    Name,
    EditBtn,
    Bio,
    Activities,
} from '@/components/profile/index';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TProfile = {
    bio?: string;
    profile_img?: string | null;
    first_name: string;
    last_name: string;
};
const Profile = () => {
    const router = useRouter();

    const [profileData, setProfileData] = useState<TProfile>();
    const [isProfileReady, setIsProfileReady] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleGetProfileApi = async () => {
        const profileResponse = await getProfile();
        const username = await AsyncStorage.getItem(
            KEYS_AND_DEFAULT.username[0]
        );
        const postsResponse = await fetchPosts({ author: username! });
        setPosts(postsResponse?.data);
        if (profileResponse && profileResponse.result) {
            setProfileData(profileResponse.data as TProfile);
            setIsProfileReady(true);
        }
    };

    useEffect(() => {
        handleGetProfileApi();
    }, []);

    if (!isProfileReady) {
        return (
            <SafeAreaView>
                <Spinner visible={true} spinnerContent={'Loading...'} />
            </SafeAreaView>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.profileTopContainer}>
                    <ImageBox imageUrl={profileData?.profile_img} />
                    <Name
                        first_name={profileData?.first_name!}
                        last_name={profileData?.last_name!}
                    />
                    <EditBtn />
                </View>
                <View style={styles.bioContainer}>
                    <Bio bio={profileData?.bio} />
                </View>
                <View style={styles.activitiesContainer}>
                    <Activities posts={posts} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: 'white',
    },
    profileTopContainer: {
        alignItems: 'center',
    },
    bioContainer: {},
    activitiesContainer: {},
});

export default Profile;
