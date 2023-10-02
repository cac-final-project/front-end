import { Text, StyleSheet } from 'react-native';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { Neighborhood, Profile } from '@/components/header/index';

const _layout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    headerTitle: (props) => <Neighborhood />,
                    headerRight: (props) => <Profile />,
                    headerTitleAlign: 'center', // This ensures that the title is centered
                    headerStyle: {
                        backgroundColor: '#B4B4B4',
                    },
                }}
            />
            <Tabs.Screen
                name="posts"
                options={{
                    headerTitle: ' ',
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={dynamicStyle(focused).label}>
                                Posts
                            </Text>
                        );
                    },

                    tabBarIcon: ({ focused }) => {
                        const Color = focused ? 'black' : 'gray';
                        return (
                            <Feather name="square" size={24} color={Color} />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="one"
                options={{
                    headerTitle: ' ',
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={dynamicStyle(focused).label}>One</Text>
                        );
                    },

                    tabBarIcon: ({ focused }) => {
                        const Color = focused ? 'black' : 'gray';
                        return (
                            <Feather name="square" size={24} color={Color} />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="two"
                options={{
                    headerTitle: ' ',
                    tabBarLabel: ({ focused }) => {
                        return (
                            <Text style={dynamicStyle(focused).label}>Two</Text>
                        );
                    },

                    tabBarIcon: ({ focused }) => {
                        const Color = focused ? 'black' : 'gray';
                        return (
                            <Feather name="square" size={24} color={Color} />
                        );
                    },
                }}
            />
        </Tabs>
    );
};

const dynamicStyle = (focused: boolean) =>
    StyleSheet.create({
        label: {
            color: focused ? 'black' : 'gray',
            fontSize: 12,
            // fontFamily: "Plus Jakarta Sans",
            fontWeight: '600',
            flexWrap: 'wrap',
        },
    });
export default _layout;

// refactoring
// make it a loop it through map
