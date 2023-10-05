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
import { useRouter } from 'expo-router';
import Header from '@/components/tipWrite/Header';
import StickyMenu from '@/components/tipWrite/StickyMenu';
import InputTitle from '@/components/tipWrite/InputTitle';
import CategoryList from '@/components/tipWrite/CategoryList';
import Location from '@/components/tipWrite/Location';
import ContentInput from '@/components/tipWrite/ContentInput';
import ImageList from '@/components/tipWrite/ImageList';
import CategoryHeader from '@/components/tipWrite/categoryDetail/CategoryHeader';
import TagInput from '@/components/tipWrite/categoryDetail/TagInput';
import RecommendList from '@/components/tipWrite/categoryDetail/RecommendList';
import * as ImagePicker from 'expo-image-picker';
import { exampleTags } from '@/components/tipWrite/exampleTags';
import { createPost } from '@/api/index';

const tipWrite = (props: any) => {
    const router = useRouter();

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

    // submit
    const handleSubmit = async () => {
        if (isCategoryOpen) {
            handleCategoryOpen();
        } else {
            const response = await createPost({
                selectedImages,
                tags,
                title,
                content,
                postType: 'tip',
            });
            Alert.alert('Your Tip has been successfully created!');
            router.replace('/posts');
        }
    };

    if (!isCategoryOpen) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <Header
                    isCategoryOpen={isCategoryOpen}
                    handleCategoryOpen={handleCategoryOpen}
                    handleSubmit={handleSubmit}
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
                                <Location />
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
    } else {
        return (
            <SafeAreaView>
                <ScrollView style={{ height: 700 }}>
                    <Header
                        isCategoryOpen={isCategoryOpen}
                        handleCategoryOpen={handleCategoryOpen}
                        handleSubmit={handleSubmit}
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
});

export default tipWrite;
