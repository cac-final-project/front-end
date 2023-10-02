import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface TabsProps {
    activeTab: PostType;
    handleSetActiveTab: (newTab: PostType) => void; // This is the type for the setState function.
}

const Tab: React.FC<TabsProps> = ({ activeTab, handleSetActiveTab }) => {
    return (
        <View style={styles.tabContainer}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === 'tip' ? styles.activeTab : null,
                ]}
                onPress={() => handleSetActiveTab('tip')}
            >
                <Text
                    style={[
                        styles.tabText,
                        activeTab === 'tip' ? styles.activeText : null,
                    ]}
                >
                    Tips
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[
                    styles.tab,
                    activeTab === 'campaign' ? styles.activeTab : null,
                ]}
                onPress={() => handleSetActiveTab('campaign')}
            >
                <Text
                    style={[
                        styles.tabText,
                        activeTab === 'campaign' ? styles.activeText : null,
                    ]}
                >
                    Campaigns
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    tab: {
        flex: 1,
        height: 48,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#E7E7E7',
    },
    activeTab: {
        backgroundColor: '#ADADAD',
        borderBottomWidth: 2,
        borderColor: '#B3B3B3',
    },
    tabText: {
        color: '#2B2B2B',
        fontSize: 16,
        // fontFamily: 'Plus Jakarta Sans',
        fontWeight: '500',
        lineHeight: 28,
        flexWrap: 'wrap',
    },
    activeText: {
        fontWeight: '700',
    },
});

export default Tab;
