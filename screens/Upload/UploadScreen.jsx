import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image, ScrollView,
  TextInput, SafeAreaView, Platform, StatusBar, Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function UploadScreen({ navigation }) {
  const [caption, setCaption] = useState('');
  const [] = useState('Post');
  const [selectedImage, setSelectedImage] = useState(null);

  // New: multiple selection mode toggle and images array
  const [multiSelectMode, setMultiSelectMode] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const imagePlaceholders = Array(12).fill(null);

  const requestPermission = async (permissionType) => {
    let permissionResult;
    if (permissionType === 'camera') {
      permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    } else {
      permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    }
    if (permissionResult.status !== 'granted') {
      Alert.alert(
        'Permission required',
        `Permission to access ${permissionType} is required!`
      );
      return false;
    }
    return true;
  };

  const pickSingleImage = async (source) => {
    let hasPermission = false;

    if (source === 'camera') {
      hasPermission = await requestPermission('camera');
    } else {
      hasPermission = await requestPermission('media library');
    }

    if (!hasPermission) return;

    let result;
    if (source === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
    }

    if (!result.canceled) {
      const image = result.assets ? result.assets[0] : result;
      return image;
    }
    return null;
  };

  // Modified handleSelectImage to work with multiSelectMode
  const handleSelectImage = async (source) => {
    if (multiSelectMode) {
      // In multi-select mode, pick one image and add to array
      const image = await pickSingleImage(source);
      if (image) {
        setSelectedImages((prev) => {
          // Avoid duplicates by uri
          if (prev.find((img) => img.uri === image.uri)) return prev;
          return [...prev, image];
        });
      }
    } else {
      // Single image pick mode (normal)
      const image = await pickSingleImage(source);
      if (image) setSelectedImage(image);
    }
  };

  // Remove image from selectedImages by uri
  const removeSelectedImage = (uri) => {
    setSelectedImages((prev) => prev.filter((img) => img.uri !== uri));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.closeButton}
           onPress={() => navigation.goBack()}
        >
          <Feather name="x" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Post</Text>
        <TouchableOpacity style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.contentContainer}>
        {/* Preview Area */}
        <View style={styles.previewSection}>
          <View style={styles.previewImageContainer}>
            {multiSelectMode ? (
              selectedImages.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {selectedImages.map((img) => (
                    <View key={img.uri} style={{ marginRight: 8, position: 'relative' }}>
                      <Image
                        source={{ uri: img.uri }}
                        style={{ width: 120, height: 120, borderRadius: 8 }}
                      />
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
                <Text style={{ padding: 12, color: '#666' }}>
                  No images selected yet.
                </Text>
              )
            ) : (
              <Image
                source={
                  selectedImage
                    ? { uri: selectedImage.uri }
                    : { uri: 'https://via.placeholder.com/400' }
                }
                style={styles.previewImage}
                resizeMode="cover"
              />
            )}
          </View>

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

        {/* Options */}
        <View style={styles.optionsSection}>
          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Tag People</Text>
            <Feather name="users" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Add Location</Text>
            <Feather name="map-pin" size={20} color="#999" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow}>
            <Text style={styles.optionText}>Add Music</Text>
            <Feather name="music" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Gallery Section */}
        <View style={styles.gallerySection}>
          <View style={styles.galleryHeader}>
            <Text style={styles.galleryTitle}>Gallery</Text>

            {/* Select Multiple toggle button */}
            <TouchableOpacity
              onPress={() => setMultiSelectMode((prev) => !prev)}
            >
              <Text style={[styles.blueText, multiSelectMode && { fontWeight: '700' }]}>
                {multiSelectMode ? 'Done' : 'Select Multiple'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Media Source Options */}
          <View style={styles.mediaSourceOptions}>
            <TouchableOpacity
              style={[styles.mediaSourceButton, !multiSelectMode && styles.activeMediaSource]}
              onPress={() => handleSelectImage('gallery')}
            >
              <Feather name="image" size={20} color={!multiSelectMode ? '#000' : '#666'} />
              <Text style={[styles.mediaSourceText, { color: !multiSelectMode ? '#000' : '#666' }]}>
                Gallery
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.mediaSourceButton}
              onPress={() => handleSelectImage('camera')}
            >
              <Feather name="camera" size={20} color="#666" />
              <Text style={[styles.mediaSourceText, { color: '#666' }]}>Camera</Text>
            </TouchableOpacity>
          </View>

          {/* Image Grid */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.imageGrid}>
              {imagePlaceholders.map((_, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.gridImageContainer}
                  onPress={() => {
                    if (multiSelectMode) {
                      // Simulate picking an image from gallery one by one
                      handleSelectImage('gallery');
                    } else {
                      handleSelectImage('gallery');
                    }
                  }}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
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
