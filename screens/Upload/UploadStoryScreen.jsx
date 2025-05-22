import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, SafeAreaView, TextInput, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const UploadStoryScreen = () => {
  const navigation = useNavigation();
  const [images, setImages] = useState([]);
  const [caption, setCaption] = useState('');

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      allowsMultipleSelection: true, // allow multiple images
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedUris = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...selectedUris]);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Camera permission is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      const uris = result.assets.map(asset => asset.uri);
      setImages(prev => [...prev, ...uris]); // ✅ append new images
    }
  };

  const handlePost = () => {
    // Handle posting the story with multiple images
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Story</Text>
        <TouchableOpacity 
          style={[styles.postButton, images.length === 0 && styles.postButtonDisabled]} 
          disabled={images.length === 0}
          onPress={handlePost}
        >
          <Text style={[styles.postButtonText, images.length === 0 && styles.postButtonTextDisabled]}>Share</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.imageContainer}>
        {images.length > 0 ? (
          <ScrollView horizontal pagingEnabled>
            {images.map((uri, index) => (
              <Image key={index} source={{ uri }} style={styles.image} />
            ))}
          </ScrollView>
        ) : (
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            <Ionicons name="add-circle-outline" size={50} color="#0095f6" />
            <Text style={styles.imagePickerText}>Add to your story</Text>
          </TouchableOpacity>
        )}
      </View>

      {images.length > 0 && (
        <View style={styles.controls}>
          <View style={styles.captionContainer}>
            <TextInput
              placeholder="Write a caption..."
              style={styles.captionInput}
              value={caption}
              onChangeText={setCaption}
              multiline
              placeholderTextColor="#8e8e8e"
            />
          </View>

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionButton} onPress={pickImage}>
              <Ionicons name="image-outline" size={26} color="black" />
              <Text style={styles.actionText}>Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={26} color="black" />
              <Text style={styles.actionText}>Camera</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="brush-outline" size={26} color="black" />
              <Text style={styles.actionText}>Draw</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="text-outline" size={26} color="black" />
              <Text style={styles.actionText}>Text</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="happy-outline" size={26} color="black" />
              <Text style={styles.actionText}>Sticker</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  postButton: {
    padding: 8,
  },
  postButtonDisabled: {
    opacity: 0.5,
  },
  postButtonText: {
    color: '#0095f6',
    fontWeight: '600',
    fontSize: 16,
  },
  postButtonTextDisabled: {
    color: '#0095f6',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginBottom: 10,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  imagePickerText: {
    marginTop: 10,
    fontSize: 16,
    color: '#0095f6',
    fontWeight: '500',
  },
  image: {
    width: 300,
    height: '100%',
    resizeMode: 'cover',
    marginHorizontal: 5,
  },
  controls: {
    padding: 15,
    borderTopWidth: 0.5,
    borderTopColor: '#dbdbdb',
  },
  captionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  captionInput: {
    flex: 1,
    minHeight: 40,
    fontSize: 16,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    marginBottom: 40,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionText: {
    marginTop: 5,
    fontSize: 12,
    color: '#262626',
  }
});

export default UploadStoryScreen;
