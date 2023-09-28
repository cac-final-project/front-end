import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { getProfile } from '@/api/getProfile';
import { SafeAreaView, Text } from 'react-native';
import { Spinner } from '@/components/index';

type TProfile = {
    bio?: string;
    profile_img?: string;
};
const Profile = () => {
    const router = useRouter();

    const [profileData, setProfileData] = useState<TProfile>(); // Renamed to avoid naming conflict
    const [isProfileReady, setIsProfileReady] = useState(false);

    const handleNavigatePostDetail = () => {
        router.replace('/login');
    };

    const handleGetProfileApi = async () => {
        const profileResponse = await getProfile();
        if (profileResponse && profileResponse.result) {
            setProfileData(profileResponse.data as TProfile);
            setIsProfileReady(true);
        } else {
            handleNavigatePostDetail();
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
        <SafeAreaView>
            <Text>Loading...</Text>
        </SafeAreaView>
    );
};

export default Profile;
