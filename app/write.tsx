import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Alert,
} from 'react-native';
import { useRouter, useSearchParams } from 'expo-router';
import Header from '@/components/write/Header';
import StickyMenu from '@/components/write/StickyMenu';
import InputTitle from '@/components/write/InputTitle';
import CategoryList from '@/components/write/CategoryList';
import Location from '@/components/write/Location';
import ContentInput from '@/components/write/ContentInput';
import ImageList from '@/components/write/ImageList';
import CategoryHeader from '@/components/write/categoryDetail/CategoryHeader';
import TagInput from '@/components/write/categoryDetail/TagInput';
import RecommendList from '@/components/write/categoryDetail/RecommendList';
import MainMap from '@/components/write/map/MainMap';
import CustomOverlay from '@/components/write/map/CustomOverlay';
import * as ImagePicker from 'expo-image-picker';
import { createPost } from '@/api/index';

const Write = (props: any) => {
    const router = useRouter();
    const { writeType }: { writeType: 'tip' | 'campaign' } = useSearchParams();
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const handleCategoryOpen = () => {
        setIsCategoryOpen((prev) => !prev);
    };

    const [isInputFocused, setInputFocused] = useState(false);

    // 1. title
    const [title, setTitle] = useState('');

    // 2. tags
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');

    const handleSetTags = () => {
        // Ensure the tag isn't empty, and isn't already in the list
        if (currentTag && !tags.includes(currentTag)) {
            setTags((prevTags) => [...prevTags, currentTag]);
        } else {
            alert('tag already exist!');
        }
        setCurrentTag(''); // Reset the input
    };

    const deleteTag = (tag: string) => {
        setTags((prev) => {
            return prev.filter((item) => item !== tag);
        });
    };

    // 3 contents
    const [content, setContent] = useState('');

    // 4 images (max two)
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const pickImage = async () => {
        if (selectedImages.length >= 2) {
            alert('Maximum of two images only!');
            return;
        }

        let result: ImagePicker.ImagePickerResult =
            await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });

        // Using optional chaining and type assertion
        if (!result.canceled && result.assets?.length > 0) {
            setSelectedImages((prevImages) => [
                ...prevImages,
                (result.assets as ImagePicker.ImagePickerAsset[])[0].uri,
            ]);
        }
    };

    // location for campaign
    const [isLocationOpen, setIsLocationOpen] = useState(false);

    const handleSetIsLocationOpen = () => {
        if (writeType === 'tip') {
            alert('You can only write Tips in the current Neighborhood');
        } else {
            setIsLocationOpen((prev) => !prev);
        }
    };

    const [draggableCoord, setDraggableCoord] = useState({
        latitude: 30.270409,
        longitude: -97.744708,
    });
    const [addressName, setAddress] = useState('');

    // submit
    const handleSubmit = async () => {
        if (isCategoryOpen) {
            handleCategoryOpen();
        } else if (isLocationOpen) {
            handleSetIsLocationOpen();
        } else {
            const response = await createPost({
                selectedImages,
                tags,
                title,
                content,
                postType: writeType,
                lat: draggableCoord.latitude,
                lon: draggableCoord.longitude,
                addressName,
            });
            console.log(response?.code);
            Alert.alert('Your Tip has been successfully created!');
            router.replace('/posts');
        }
    };

    if (!isCategoryOpen && !isLocationOpen) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    isCategoryOpen={isCategoryOpen}
                    handleCategoryOpen={handleCategoryOpen}
                    handleSubmit={handleSubmit}
                    writeType={writeType}
                    isLocationOpen={isLocationOpen}
                    handleSetIsLocationOpen={handleSetIsLocationOpen}
                />
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={Platform.OS === 'ios' ? 70 : 40}
                >
                    <ScrollView style={styles.inputContainer}>
                        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                            <View>
                                <InputTitle title={title} onChange={setTitle} />
                                <CategoryList
                                    handleCategoryOpen={handleCategoryOpen}
                                    tags={tags}
                                />
                                <Location
                                    handleSetIsLocationOpen={
                                        handleSetIsLocationOpen
                                    }
                                    writeType={writeType}
                                    addressName={addressName}
                                />
                                <View style={styles.line}></View>
                                <ContentInput
                                    content={content}
                                    onChange={setContent}
                                    setInputFocused={setInputFocused}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                    </ScrollView>
                </KeyboardAvoidingView>
                <ImageList
                    selectedImages={selectedImages}
                    setSelectedImages={setSelectedImages}
                />
                {/* {isInputFocused && <StickyMenu pickImage={pickImage} />} */}
                <StickyMenu pickImage={pickImage} />
            </SafeAreaView>
        );
    } else if (isCategoryOpen) {
        return (
            <SafeAreaView>
                <ScrollView style={{ height: 700 }}>
                    <Header
                        writeType={writeType}
                        isCategoryOpen={isCategoryOpen}
                        handleCategoryOpen={handleCategoryOpen}
                        handleSubmit={handleSubmit}
                        isLocationOpen={isLocationOpen}
                        handleSetIsLocationOpen={handleSetIsLocationOpen}
                    />
                    <View style={styles.categoryPageContainer}>
                        <CategoryHeader />
                        <TagInput
                            tags={tags}
                            deleteTag={deleteTag}
                            currentTag={currentTag}
                            setCurrentTag={setCurrentTag}
                            handleSetTags={handleSetTags}
                        />
                        <View style={styles.line}></View>
                        <View>
                            <Text style={styles.tagListExplain}>
                                Select an option or create one
                            </Text>
                        </View>
                        <RecommendList />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    } else if (isLocationOpen) {
        return (
            <SafeAreaView style={styles.mapContainer}>
                <Header
                    writeType={writeType}
                    isCategoryOpen={isCategoryOpen}
                    handleCategoryOpen={handleCategoryOpen}
                    handleSubmit={handleSubmit}
                    isLocationOpen={isLocationOpen}
                    handleSetIsLocationOpen={handleSetIsLocationOpen}
                />
                <MainMap
                    setAddress={setAddress}
                    draggableCoord={draggableCoord}
                    setDraggableCoord={setDraggableCoord}
                />
                <CustomOverlay addressName={addressName} />
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    inputContainer: {
        // flex: 1,
        padding: 24,
    },

    line: {
        width: '100%',
        borderBottomWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 16,
    },

    categoryPageContainer: {
        padding: 24,
    },

    tagListExplain: {
        color: '#8A8A8A',
        fontSize: 13,
        fontWeight: '400',
    },

    mapContainer: {
        flex: 1,
    },
});

export default Write;
