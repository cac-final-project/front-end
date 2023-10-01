import { useState } from 'react';
import { useRouter } from 'expo-router';
import {
    SafeAreaView,
    Text,
    View,
    ScrollView,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { getStyles } from '@/styles/login';
import { loginApi } from '@/api/login';

const login = () => {
    const router = useRouter();
    const [loginInfo, setLoginInfo] = useState<LoginInfo>({
        username: '',
        password: '',
    });

    const handleLoginInfoChange = (field: keyof LoginInfo, value: string) => {
        setLoginInfo((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const loginBtn = async () => {
        const res = await loginApi(loginInfo);
        if (res?.result) {
            alert('login success!');
            router.push('/');
        } else {
            alert('login failed');
        }
    };

    const handleForgotPw = () => {
        router.push('/forgotPw');
    };

    // Compute the prop value
    const isComplete = loginInfo.username !== '' && loginInfo.password !== '';

    const styles = getStyles(isComplete);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.box}>
                <Text style={styles.text}>Login to your account</Text>
            </View>

            <ScrollView>
                <View style={styles.scrollContainer}>
                    <KeyboardAvoidingView>
                        <TouchableWithoutFeedback>
                            <View style={styles.inputContainer}>
                                <View style={styles.inputBox}>
                                    <Text style={styles.labelText}>ID</Text>
                                    <TextInput
                                        placeholder="Enter your ID"
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        value={loginInfo.username}
                                        onChangeText={(text) =>
                                            handleLoginInfoChange(
                                                'username',
                                                text
                                            )
                                        }
                                    />
                                </View>
                                <View style={styles.inputBox}>
                                    <Text style={styles.labelText}>
                                        Password
                                    </Text>
                                    <TextInput
                                        placeholder="Enter your ID"
                                        style={styles.input}
                                        underlineColorAndroid="transparent"
                                        secureTextEntry={true}
                                        value={loginInfo.password}
                                        onChangeText={(text) =>
                                            handleLoginInfoChange(
                                                'password',
                                                text
                                            )
                                        }
                                    />
                                </View>
                                <View>
                                    <Text
                                        style={styles.ForgotPwText}
                                        onPress={handleForgotPw}
                                    >
                                        Forgot password?
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={loginBtn}
                                    disabled={!isComplete}
                                >
                                    <Text style={styles.loginText}>Log in</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableWithoutFeedback>
                    </KeyboardAvoidingView>
                    <View style={styles.SignInContainer}>
                        <Text style={styles.SignInText}>
                            Don't have an account?{' '}
                            <Text style={styles.SignInLink}>Sign up</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default login;
