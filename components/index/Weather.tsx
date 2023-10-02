import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { Feather, FontAwesome5 } from '@expo/vector-icons';

type TLevelBar = 1 | 2 | 3 | 4;

const WeatherInfo: React.FC = () => {
    const [currentLevel, setCurrentLevel] = useState<TLevelBar>(3); // Example level value
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(animatedValue, {
            toValue: currentLevel * 25,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [currentLevel]);

    const widthInterpolation = animatedValue.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
    });

    const getLevelColor = (level: number) => {
        switch (level) {
            case 1:
                return '#929292';
            case 2:
                return '#929292';
            case 3:
                return '#929292';
            case 4:
                return '#929292';
            default:
                return '#929292';
        }
    };

    return (
        <View style={styles.container}>
            <Feather name="sun" size={24} color="black" />

            <View style={styles.levelBarContainer}>
                <View style={styles.levelBarBackground} />
                <Animated.View
                    style={[
                        styles.filledLevel,
                        {
                            width: widthInterpolation,
                            backgroundColor: getLevelColor(currentLevel),
                        },
                    ]}
                />
                <Text style={styles.levelText}>Level {currentLevel}</Text>
            </View>

            <View style={styles.tempContainer}>
                <FontAwesome5 name="temperature-high" size={24} color="black" />
                <Text style={styles.tempText}>40°C</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#DADADA',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    levelBarContainer: {
        width: 250,
        height: 27.25,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
    },
    levelBarBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    filledLevel: {
        height: 27.25,
        position: 'absolute',
        left: 0,
        top: 0,
    },
    levelText: {
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: 1.2,
        color: '#2B2B2B',
        position: 'absolute',
        left: 13,
        top: 4.04,
    },
    tempContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    tempText: {
        color: '#2B2B2B',
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 18,
        letterSpacing: 1.2,
        marginLeft: 4,
    },
});

export default WeatherInfo;
