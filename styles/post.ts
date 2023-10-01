import { StyleSheet } from 'react-native';

export const postStyles = StyleSheet.create({
    postContainer: {
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        gap: 8,
    },
    leftBox: {
        flex: 7,
        justifyContent: 'space-between',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 8,
    },
    rightBox: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        paddingVertical: 8,
    },
    tipContainer: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        backgroundColor: '#909090',
        borderRadius: 8,
    },
    tagText: {
        color: 'white',
        fontSize: 10,
        fontWeight: '700',
    },
    postTitle: {
        color: '#2B2B2B',
        fontSize: 15,
        fontWeight: '700',
    },
    postDate: {
        color: '#2B2B2B',
        fontSize: 10,
        fontWeight: '400',
    },

    rightBoxVoteContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
