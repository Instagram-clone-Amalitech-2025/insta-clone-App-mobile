import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,
  TextInput, SafeAreaView, Platform, StatusBar, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { createPost } from '../../redux/slices/postSlice';

export default function UploadScreen({ navigation }) {
  const dispatch = useDispatch();

  const [caption, setCaption] = useState('');
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const imagePlaceholders = Array(12).fill(null); // <-- ✅ MAKE SURE THIS LINE IS PRESENT


  const requestPermission = async (permissionType) => {
    const result =
      permissionType === 'camera'
        ? await ImagePicker.requestCameraPermissionsAsync()
        : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (result.status !== 'granted') {
      Alert.alert('Permission required', `Access to ${permissionType} is required.`);
      return false;
    }
    return true;
  };

  const pickSingleImage = async (source) => {
    const permissionGranted = await requestPermission(source === 'camera' ? 'camera' : 'media library');
    if (!permissionGranted) return null;

    const result =
      source === 'camera'
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
          });

    if (!result.canceled) return result.assets[0];
    return null;
  };

  const handleSelectImage = async (source) => {
    const image = await pickSingleImage(source);
    if (!image) return;

    if (multiSelectMode) {
      setSelectedImages((prev) => {
        if (prev.find((img) => img.uri === image.uri)) return prev;
        return [...prev, image];
      });
    } else {
      setSelectedImages([image]);
    }
  };

  const removeSelectedImage = (uri) => {
    setSelectedImages((prev) => prev.filter((img) => img.uri !== uri));
  };

  const handlePost = async () => {
    if (!caption && selectedImages.length === 0) {
      Alert.alert('Missing content', 'Please select an image or write a caption.');
      return;
    }

    const formData = new FormData();
    formData.append('caption', caption);

    if (selectedImages.length > 0) {
      formData.append('image', {
        uri: selectedImages[0].uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });
    }

    try {
      await dispatch(createPost(formData)).unwrap();
      setCaption('');
      setSelectedImages([]);
      navigation.goBack();
    } catch (error) {
      console.error('Error uploading post:', error);
      Alert.alert('Upload Failed', 'Something went wrong. Please try again.');
    }
  };

  return (
  <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" />
    
    {/* Header */}
    <View style={styles.header}>
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Feather name="x" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>New Post</Text>
      <TouchableOpacity style={styles.nextButton} onPress={handlePost}>
        <Text style={styles.nextButtonText}>Post</Text>
      </TouchableOpacity>
    </View>

    {/* Content */}
    <ScrollView contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      
      {/* Preview & Caption */}
      <View style={styles.previewSection}>
        <View style={styles.previewImageContainer}>
          {selectedImages.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {selectedImages.map((img) => (
                <View key={img.uri} style={{ marginRight: 8, position: 'relative' }}>
                  <Image source={{ uri: img.uri }} style={{ width: 120, height: 120, borderRadius: 8 }} />
                  <TouchableOpacity
                    onPress={() => removeSelectedImage(img.uri)}
                    style={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      backgroundColor: 'rgba(0,0,0,0.6)',
                      borderRadius: 12,
                      padding: 2,
                    }}
                  >
                    <Feather name="x" size={16} color="white" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <Text style={{ padding: 12, color: '#666' }}>No images selected yet.</Text>
          )}
        </View>

        {/* Caption input */}
        <View style={styles.captionContainer}>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption..."
            placeholderTextColor="#999"
            multiline
            value={caption}
            onChangeText={setCaption}
          />
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="smile" size={22} color="#999" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Gallery simulation */}
      <View style={styles.gallerySection}>
        <View style={styles.galleryHeader}>
          <Text style={styles.galleryTitle}>Gallery</Text>
          <TouchableOpacity onPress={() => setMultiSelectMode((prev) => !prev)}>
            <Text style={[styles.blueText, multiSelectMode && { fontWeight: '700' }]}>
              {multiSelectMode ? 'Done' : 'Select Multiple'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mediaSourceOptions}>
          <TouchableOpacity style={styles.mediaSourceButton} onPress={() => handleSelectImage('gallery')}>
            <Feather name="image" size={20} color="#666" />
            <Text style={styles.mediaSourceText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mediaSourceButton} onPress={() => handleSelectImage('camera')}>
            <Feather name="camera" size={20} color="#666" />
            <Text style={styles.mediaSourceText}>Camera</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.imageGrid}>
            {imagePlaceholders.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={styles.gridImageContainer}
                onPress={() => handleSelectImage('gallery')}
              >
                <Image
                  source={{
                    uri: `https://via.placeholder.com/150/CCCCCC/888888?text=${index + 1}`,
                  }}
                  style={styles.gridImage}
                  resizeMode="cover"
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </ScrollView>
  </SafeAreaView>
);
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  closeButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  nextButton: {
    padding: 5,
  },
  nextButtonText: {
    color: '#0095f6',
    fontWeight: '600',
    fontSize: 16,
  },
  contentContainer: {
    flex: 1,
  },
  previewSection: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  previewImageContainer: {
    height: 300,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  captionInput: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
    paddingVertical: 8,
  },
  iconButton: {
    padding: 5,
  },
  optionsSection: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 16,
    color: '#262626',
  },
  divider: {
    height: 8,
    backgroundColor: '#f5f5f5',
  },
  gallerySection: {
    flex: 1,
  },
  galleryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  galleryTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  blueText: {
    color: '#0095f6',
    fontWeight: '500',
  },
  mediaSourceOptions: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    paddingHorizontal: 16,
  },
  mediaSourceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
    paddingVertical: 8,
  },
  activeMediaSource: {
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  mediaSourceText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridImageContainer: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
});
