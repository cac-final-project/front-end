import { SafeAreaView, StyleSheet, Pressable } from 'react-native';
import { Link } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const Profile = () => {
    return (
        <Link href="/profile" asChild>
            <Pressable>
                {({ pressed }) => {
                    return (
                        <SafeAreaView style={styles.rightBox}>
                            <FontAwesome5 name="user" size={20} color="black" />
                        </SafeAreaView>
                    );
                }}
                {/* <Text>Home</Text> */}
            </Pressable>
        </Link>
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
