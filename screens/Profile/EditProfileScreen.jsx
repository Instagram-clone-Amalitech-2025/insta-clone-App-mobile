import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, 
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, Modal, Pressable 
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

// Define the default placeholder URI
const DEFAULT_AVATAR_PLACEHOLDER = 'https://via.placeholder.com/150';

export default function EditProfileScreen({ navigation, route }) {
  // Get user data passed from ProfileScreen
  const initialUser = route.params?.user || {
    username: 'User1',
    name: 'User 1',
    bio: 'Mobile Developer | React Native Enthusiast',
    avatar: DEFAULT_AVATAR_PLACEHOLDER,
    posts: 9,
    followers: 10,
    following: 30,
    website: '',
    phone: '',
    email: 'user1@example.com',
    gender: ''
  };

  // State for edited user data
  const [userData, setUserData] = useState({...initialUser});
  
  // State for checking if any changes were made
  const [hasChanges, setHasChanges] = useState(false);

  // State for gender modal visibility
  const [genderModalVisible, setGenderModalVisible] = useState(false);

  // Update state when form fields change
  const handleChange = (field, value) => {
    setUserData(prevData => ({
      ...prevData,
      [field]: value
    }));
    setHasChanges(true);
  };

  // Handle save changes
  const handleSave = () => {
    if (hasChanges) {
      // Return to ProfileScreen with updated user data
      navigation.navigate('Profile', { updatedUser: userData });
    } else {
      navigation.goBack();
    }
  };

  // Handle discard changes
  const handleDiscard = () => {
    if (hasChanges) {
      Alert.alert(
        "Discard Changes",
        "Are you sure you want to discard your changes?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Discard", 
            onPress: () => navigation.goBack(),
            style: "destructive"
          }
        ]
      );
    } else {
      navigation.goBack();
    }
  };

  // Handle avatar change
  const handleChangeAvatar = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant access to your photos to change profile picture");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      handleChange('avatar', result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleDiscard}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Feather name="check" size={24} color="#3897F0" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Profile Picture Section */}
          <View style={styles.avatarSection}>
            {userData.avatar === DEFAULT_AVATAR_PLACEHOLDER ? (
              // Show grey placeholder if avatar is the default placeholder
              <View style={[styles.avatar, styles.greyAvatarPlaceholder]} />
            ) : (
              // Show actual image if avatar is not the default placeholder
              <Image source={{ uri: userData.avatar }} style={styles.avatar} />
            )}
            <TouchableOpacity onPress={handleChangeAvatar}>
              <Text style={styles.changePhotoText}>Change Profile Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={userData.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder="Name"
                placeholderTextColor="#999"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Username</Text>
              <TextInput
                style={styles.textInput}
                value={userData.username}
                onChangeText={(text) => handleChange('username', text)}
                placeholder="Username"
                placeholderTextColor="#999"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Bio</Text>
              <TextInput
                style={[styles.textInput, styles.bioInput]}
                value={userData.bio}
                onChangeText={(text) => handleChange('bio', text)}
                placeholder="Bio"
                placeholderTextColor="#999"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />
            </View>

            <Text style={styles.sectionTitle}>Private Information</Text>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                value={userData.email}
                onChangeText={(text) => handleChange('email', text)}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Phone</Text>
              <TextInput
                style={styles.textInput}
                value={userData.phone}
                onChangeText={(text) => handleChange('phone', text)}
                placeholder="Phone"
                placeholderTextColor="#999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Website</Text>
              <TextInput
                style={styles.textInput}
                value={userData.website}
                onChangeText={(text) => handleChange('website', text)}
                placeholder="Website"
                placeholderTextColor="#999"
                keyboardType="url"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Gender</Text>
              <TouchableOpacity 
                style={styles.genderSelector} 
                onPress={() => setGenderModalVisible(true)}
              >
                <Text style={userData.gender ? styles.textInput : styles.placeholderText}>
                  {userData.gender || "Gender"}
                </Text>
                <Feather name="chevron-right" size={20} color="#999" />
              </TouchableOpacity>
            </View>

            {/* Switch account option */}
            <TouchableOpacity style={styles.switchAccountButton}>
              <Text style={styles.switchAccountText}>Switch to Professional Account</Text>
            </TouchableOpacity>

            {/* Personal information settings */}
            <TouchableOpacity style={styles.personalInfoButton}>
              <Text style={styles.personalInfoText}>Personal information settings</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* Gender Selection Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={genderModalVisible}
          onRequestClose={() => setGenderModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Select Gender</Text>
              
              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  handleChange('gender', 'Male');
                  setGenderModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>Male</Text>
              </Pressable>

              <Pressable
                style={styles.modalOption}
                onPress={() => {
                  handleChange('gender', 'Female');
                  setGenderModalVisible(false);
                }}
              >
                <Text style={styles.modalOptionText}>Female</Text>
              </Pressable>

              <Pressable
                style={[styles.modalOption, styles.modalCancel]}
                onPress={() => setGenderModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 30,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  avatarSection: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  greyAvatarPlaceholder: { // Added style for grey background
    backgroundColor: '#E0E0E0', 
  },
  changePhotoText: {
    color: '#3897F0',
    fontSize: 14,
    fontWeight: '600',
  },
  formSection: {
    paddingHorizontal: 15,
  },
  formField: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  fieldLabel: {
    fontSize: 14,
    color: '#262626',
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    fontSize: 16,
    color: '#262626',
    padding: 0,
  },
  bioInput: {
    height: 80,
    paddingTop: 0,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 10,
  },
  genderSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  switchAccountButton: {
    marginTop: 25,
    paddingVertical: 12,
  },
  switchAccountText: {
    fontSize: 16,
    color: '#3897F0',
    fontWeight: '600',
  },
  personalInfoButton: {
    marginTop: 5,
    marginBottom: 40,
    paddingVertical: 12,
  },
  personalInfoText: {
    fontSize: 16,
    color: '#3897F0',
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  modalOption: {
    paddingVertical: 12,
    width: '100%',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalCancel: {
    borderBottomWidth: 0,
    marginTop: 10,
  },
  modalCancelText: {
    fontSize: 16,
    color: '#3897F0',
    fontWeight: '600',
  },
});
