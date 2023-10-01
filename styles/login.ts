import { StyleSheet } from 'react-native';

export const getStyles = (isComplete: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: 'white',
        },
        scrollContainer: {
            // flex: 1,
            // flexDirection: 'column',
            // justifyContent: 'flex-end',
        },
        box: {
            backgroundColor: '#B4B4B4',
            paddingLeft: 24,
            paddingRight: 124,
            paddingTop: 30,
            paddingBottom: 15,
        },
        text: {
            color: '#2B2B2B',
            fontSize: 20,
            // fontFamily: 'Plus Jakarta Sans',
            fontWeight: '700',
            letterSpacing: 0.6,
            flexWrap: 'wrap', // Corresponds to word-wrap: break-word in CSS
        },

        inputContainer: {
            flex: 1,
            padding: 24,
            // height: 200,
        },
        inputBox: {
            marginBottom: 16,
        },
        labelText: {
            fontSize: 14,
            fontWeight: '400',
            letterSpacing: 0.42,
        },
        input: {
            // height: 40,
            marginTop: 8,
            padding: 16,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start',
            backgroundColor: '#f1f1f1',
            borderBottomWidth: 0,
            borderWidth: 0,
            borderRadius: 8,
            color: 'black',
            fontSize: 14,
            fontWeight: '400',
        },
        button: {
            marginTop: 25,
            padding: 16,
            backgroundColor: isComplete ? 'black' : '#969696',
            borderRadius: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
        },
        loginText: {
            color: 'white',
            fontSize: 16,
            fontWeight: '700',
        },
        ForgotPwText: {
            color: '#001FC5',
            textDecorationLine: 'underline',
        },
        SignInContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 140,
        },
        SignInText: {
            color: 'black',
            fontWeight: '400',
            fontSize: 12,
        },
        SignInLink: {
            color: '#001FC5',
            fontWeight: '400',
            fontSize: 12,
        },
    });
