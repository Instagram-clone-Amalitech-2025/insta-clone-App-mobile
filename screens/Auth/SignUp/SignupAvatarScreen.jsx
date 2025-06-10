import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity, Image } from 'react-native';
import Button from '../../../components/Common/Button'; 
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';

export default function SignupAvatarScreen({ route, navigation }) {
  const { identifier, fullName } = route.params;
  const [avatarUri, setAvatarUri] = useState(null); 

  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const handleAddPicture = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatarUri(result.assets[0].uri);
    }
  };

  const handleNext = () => {
    navigation.navigate('SignupUsername', { identifier, fullName, avatarUri });
  };

  const handleSkip = () => {
    navigation.navigate('SignupUsername', { identifier, fullName, avatarUri: null });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
        </TouchableOpacity>

        <Text style={[styles.title, isDark && styles.darkText]}>Add Profile Picture</Text>
        <Text style={[styles.subtitle, isDark && styles.darkMutedText]}>
          Add a profile picture so your friends know it's you.
        </Text>

        {/* Avatar Image / Placeholder */}
        <View style={styles.avatarContainer}>
          {avatarUri ? (
            <Image source={{ uri: avatarUri }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
              <Feather name="camera" size={40} color="#fff" />
            </View>
          )}
        </View>

        {/* Buttons */}
        <Button
          title="Add a Picture"
          onPress={handleAddPicture} 
          style={[styles.button, isDark && styles.darkButton]}
          textStyle={[styles.buttonText, isDark && styles.darkButtonText]}
        />
        {/* This button navigates to the next screen */}
         <Button
          title="Next"
          onPress={handleNext} 
          style={[styles.button, isDark && styles.darkButton]}
          textStyle={[styles.buttonText, isDark && styles.darkButtonText]}
        />

        <TouchableOpacity
            style={[styles.outlineButton, isDark && styles.darkOutlineButton]}
            onPress={handleSkip} 
        >
            <Text style={[styles.outlineButtonText, isDark && styles.darkOutlineButtonText]}>Skip</Text>
        </TouchableOpacity>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'flex-start', 
    paddingHorizontal: 20,
    paddingTop: 80, 
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 20,
    zIndex: 1,
    padding: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    marginBottom: 30,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#dbdbdb', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarPlaceholder: {
    backgroundColor: '#dbdbdb', 
  },
  button: {
    backgroundColor: '#0095f6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 10, 
    width: '100%',
    maxWidth: 350,
  },
  darkButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  darkButtonText: {
    color: '#fff',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0095f6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 15, 
    width: '100%',
    maxWidth: 350,
  },
  darkOutlineButton: {
    borderColor: '#007bff',
  },
  outlineButtonText: {
    color: '#0095f6',
    fontWeight: 'bold',
    fontSize: 16,
  },
  darkOutlineButtonText: {
    color: '#007bff',
  },
  darkText: {
    color: '#fff',
  },
  darkMutedText: {
    color: '#aaa',
  },
});