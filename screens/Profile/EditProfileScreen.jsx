import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView,SafeAreaView,KeyboardAvoidingView,Platform} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function EditProfileScreen({ navigation, route }) {
  // Get user data passed from the profile screen or use default values
  const initialUser = route.params?.user || {
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Mobile Developer | React Native Enthusiast',
    avatar: 'https://i.pravatar.cc/150?img=12',
    website: '',
    phone: '',
    email: 'johndoe@example.com',
    gender: ''
  };

  const [user, setUser] = useState(initialUser);
  
  // Handle text input changes
  const handleChange = (key, value) => {
    setUser({
      ...user,
      [key]: value
    });
  };

  // Save changes and return to profile screen
  const handleSave = () => {
    // Pass the updated user data back to the ProfileScreen
    navigation.navigate('Profile', { updatedUser: user });
  };

  // Cancel editing and return to profile
  const handleCancel = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleCancel}>
            <Feather name="x" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <TouchableOpacity onPress={handleSave}>
            <Feather name="check" size={24} color="#3897F0" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          {/* Profile Picture Section */}
          <View style={styles.avatarContainer}>
            <Image source={{ uri: user.avatar }} style={styles.avatar} />
            <TouchableOpacity>
              <Text style={styles.changePhotoText}>Change Profile Photo</Text>
            </TouchableOpacity>
          </View>

          {/* Form Fields */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={user.name}
                onChangeText={(text) => handleChange('name', text)}
                placeholder="Name"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={user.username}
                onChangeText={(text) => handleChange('username', text)}
                placeholder="Username"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={user.bio}
                onChangeText={(text) => handleChange('bio', text)}
                placeholder="Bio"
                multiline
                numberOfLines={3}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionHeader}>Personal Information</Text>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={(text) => handleChange('email', text)}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={user.phone}
                onChangeText={(text) => handleChange('phone', text)}
                placeholder="Phone"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Website</Text>
              <TextInput
                style={styles.input}
                value={user.website}
                onChangeText={(text) => handleChange('website', text)}
                placeholder="Website"
                autoCapitalize="none"
                keyboardType="url"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Gender</Text>
              <TextInput
                style={styles.input}
                value={user.gender}
                onChangeText={(text) => handleChange('gender', text)}
                placeholder="Gender"
              />
            </View>

            <TouchableOpacity style={styles.privateInfoButton}>
              <Text style={styles.privateInfoText}>Switch to Professional Account</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.privateInfoButton}>
              <Text style={styles.privateInfoText}>Personal Information Settings</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  avatarContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  changePhotoText: {
    color: '#3897F0',
    fontSize: 14,
    fontWeight: '500',
  },
  form: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#262626',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#FAFAFA',
  },
  bioInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  section: {
    paddingVertical: 15,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  privateInfoButton: {
    marginVertical: 10,
  },
  privateInfoText: {
    color: '#3897F0',
    fontSize: 14,
    fontWeight: '500',
  },
});