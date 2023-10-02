import { SafeAreaView, StyleSheet, Pressable, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { KEYS_AND_DEFAULT } from '@/localStorage/storageKeys';

const Profile = () => {
    const router = useRouter(); // This hook provides router navigation methods

    const handlePress = async () => {
        const retrievedValue = await AsyncStorage.getItem(
            KEYS_AND_DEFAULT.isLoggedIn[0]
        );
        const isLoggedIn = JSON.parse(retrievedValue!);
        if (isLoggedIn) {
            router.push('/profile');
        } else {
            Alert.alert(
                'Login Required', // Title
                'You are not logged in. Move to login page?', // Message
                [
                    // Buttons array
                    {
                        text: 'Cancel',
                        style: 'cancel',
                    },
                    {
                        text: 'OK',
                        onPress: () => router.push('/login'),
                    },
                ]
            );
        }
    };

    return (
        <Pressable onPress={handlePress}>
            {({ pressed }) => (
                <SafeAreaView style={styles.rightBox}>
                    <FontAwesome5 name="user" size={20} color="black" />
                </SafeAreaView>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    rightBox: {
        backgroundColor: 'rgba(0, 0, 0, 0.20)',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center', // icon to center
        marginRight: 16,
    },
});

export default Profile;
