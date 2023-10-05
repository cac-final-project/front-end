import React from 'react';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const CancelBtn = () => {
    const rotuer = useRouter();
    return (
        <TouchableOpacity onPress={() => rotuer.push('/posts')}>
            <Feather name="x" size={24} color="black" />;
        </TouchableOpacity>
    );
};

export default CancelBtn;
