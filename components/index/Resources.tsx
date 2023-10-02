import React, { useState, useEffect, useMemo } from 'react';
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
    const [filteredResourcesData, setFilteredResourcesData] = useState<
        TResource[]
    >(resourcesData?.data || []);
    const [selectedTag, setSelectedTag] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Using useMemo to filter data only when necessary
    const displayedData = useMemo(() => {
        if (selectedTag !== '') {
            return (
                resourcesData?.data?.filter((item) =>
                    item.tags.includes(selectedTag as Amenity)
                ) || []
            );
        }
        return resourcesData?.data || [];
    }, [selectedTag, resourcesData]);

    useEffect(() => {
        setFilteredResourcesData(displayedData);
    }, [displayedData]);

    useEffect(() => {
        let timeoutId: NodeJS.Timeout;
        if (isLoading) {
            timeoutId = setTimeout(() => {
                setIsLoading(false);
            }, 100);
        }
        return () => {
            clearTimeout(timeoutId);
        };
    }, [isLoading]);

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
            {isLoading ? (
                <View>
                    <CustomSpinner
                        visible={true}
                        spinnerContent={'Loading...'}
                    />
                </View>
            ) : (
                <FlatList
                    style={styles.postContainer}
                    data={filteredResourcesData}
                    keyExtractor={(item, idx) => idx.toString()}
                    renderItem={({ item }) => <ResourcePost data={item} />}
                />
            )}
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
        height: 400,
    },
});

export default Resources;
