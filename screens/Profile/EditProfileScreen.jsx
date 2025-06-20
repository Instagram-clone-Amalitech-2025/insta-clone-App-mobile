import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView, 
  SafeAreaView, KeyboardAvoidingView, Platform, Alert, Modal, Pressable, ActivityIndicator
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserProfile } from '../../redux/slices/userSlice'; 


// Define the default placeholder URI
const DEFAULT_AVATAR_PLACEHOLDER = 'https://i.pravatar.cc/150?img=64';

export default function EditProfileScreen({ navigation, route }) {
  // Get user data passed from ProfileScreen
  const initialUser = {
  username: route.params?.user?.username || '',
  full_name: route.params?.user?.full_name || '',
  bio: route.params?.user?.bio || '',
  avatar: route.params?.user?.profile_picture || DEFAULT_AVATAR_PLACEHOLDER,
  posts: route.params?.user?.post_count || 0,
  followers: route.params?.user?.followers_count || 0,
  following: route.params?.user?.following_count || 0,
  website: route.params?.user?.website || '',
  phone: route.params?.user?.phone || '',
  email: route.params?.user?.email || '',
  gender: route.params?.user?.gender || '',
};

const [loading, setLoading] = useState(false); 
const dispatch = useDispatch();
const token = useSelector((state) => state.user.token);


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
const handleSave = async () => {
  try {
    setLoading(true);

    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('full_name', userData.full_name);
    formData.append('bio', userData.bio);
    formData.append('website', userData.website);

    if (
      userData.profile_picture &&
      typeof userData.profile_picture === 'string' &&
      !userData.profile_picture.startsWith('http')
    ) {
      const uri = userData.profile_picture;
      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const type = match ? `image/${match[1]}` : `image`;
      console.log('📸 Adding profile picture:', uri, filename, type);

      formData.append('profile_picture', {
        uri,
        name: filename,
        type,
      });
    }

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

console.log('🧪 Saving with profile_picture:', userData.profile_picture);
if (userData.profile_picture && typeof userData.profile_picture !== 'string') {
  console.warn('❌ profile_picture is not a string URI!');
}

    await dispatch(updateUserProfile(formData)).unwrap();
    console.log('✅ Profile updated successfully');

    // ✅ Navigate back after success
    navigation.goBack();

  } catch (err) {
    console.error('❌ Update failed:', err);
    Alert.alert('Error', 'Something went wrong. Please try again.');
  } finally {
    setLoading(false);
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
const handleImagePick = async () => {
  try {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert("Permission Required", "You need to grant access to your photos to change profile picture");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const originalImage = result.assets[0];
      console.log('✅ Picked original image:', originalImage);

      // Resize and compress image
      const manipulatedImage = await ImageManipulator.manipulateAsync(
        originalImage.uri,
        [{ resize: { width: 1024 } }],
        {
          compress: 0.7,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      console.log('🖼️ Compressed image:', manipulatedImage);

      setUserData((prev) => ({
        ...prev,
        profile_picture: manipulatedImage.uri,
        avatar: manipulatedImage.uri, 
      }));

      setHasChanges(true);
    }
  } catch (error) {
    console.error('❌ Image pick or compression failed:', error);
    Alert.alert('Error', 'Could not process the image.');
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
          <TouchableOpacity onPress={handleSave} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#3897F0" />
            ) : (
              <Feather name="check" size={24} color="#3897F0" />
            )}
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
            <TouchableOpacity onPress={handleImagePick}>
              <Text style={styles.changePhotoText}>Change Profile Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.formSection}>
            <View style={styles.formField}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                value={userData.full_name}
                onChangeText={(text) => handleChange('full_name', text)}
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
    marginTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
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
  greyAvatarPlaceholder: { 
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
