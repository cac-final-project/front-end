import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { CustomSpinner } from '@/components/index';
import Amenity from './Amenity';
import Tag from './Tag';
import ResourcePost from './ResourcePost';

interface ResourcesProps {
    resourcesData?: IResourceData;
}

const Resources: React.FC<ResourcesProps> = ({ resourcesData }) => {
    const [selectedTag, setSelectedTag] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [renderedPosts, setRenderedPosts] = useState(0);

    const handleTagClick = (tag: string) => {
        setIsLoading(true);
        setSelectedTag(tag);
    };

    return (
        <View style={styles.resourcesContainer}>
            <Text style={styles.resourcesTitle}>
                Find useful resources near you!
            </Text>
            <ScrollView
                style={styles.amenityScrollViewContainer}
                horizontal
                showsHorizontalScrollIndicator={false}
            >
                <Amenity amenity={'map'} />
                {resourcesData?.amenities.map((item, idx) => {
                    return <Amenity key={idx} amenity={item as Amenity} />;
                })}
            </ScrollView>
            <View style={styles.tagsContainer}>
                <Feather name="filter" size={17} color="black" />
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {resourcesData?.tags.map((item, idx) => {
                        return (
                            <Tag
                                key={idx}
                                tag={item}
                                handleTagClick={handleTagClick}
                                selectedTag={selectedTag}
                            />
                        );
                    })}
                </ScrollView>
            </View>
            {/* <View>
                <CustomSpinner visible={true} spinnerContent={'Loading...'} />
            </View> */}
            <FlatList
                style={styles.postContainer}
                data={resourcesData?.data}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                    <ResourcePost
                        data={item}
                        onRender={() => setRenderedPosts((prev) => prev + 1)}
                    />
                )}
            />

            {/* {isLoading || renderedPosts < (resourcesData?.data.length || 0) ? (
                <Spinner visible={isLoading} spinnerContent={'Loading...'} />
            ) : (
                <FlatList
                    style={styles.postContainer}
                    data={resourcesData?.data}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => (
                        <ResourcePost
                            data={item}
                            onRender={() =>
                                setRenderedPosts((prev) => prev + 1)
                            }
                        />
                    )}
                />
            )} */}
        </View>
    );
};

const styles = StyleSheet.create({
    resourcesContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },

    resourcesTitle: {
        color: '#2B2B2B',
        fontSize: 16,
        fontWeight: '700',
    },
    amenityScrollViewContainer: {
        marginTop: 8,
    },
    tagsContainer: {
        flexDirection: 'row',
        marginVertical: 16,
    },
    postContainer: {
        height: 600,
    },
});

export default Resources;
