import React, { useState } from 'react';
import { StyleSheet, View, Text,TouchableOpacity,Switch, ScrollView, Image, Alert,Platform,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const AccountSettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => {
            // Handle logout logic here
            console.log('User logged out');
            // navigation.navigate('Login');
          },
          style: 'destructive'
        },
      ]
    );
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            // Handle account deletion logic here
            console.log('Account deletion requested');
          },
          style: 'destructive'
        },
      ]
    );
  };

  const renderSettingItem = (title, value, onValueChange) => (
    <View style={styles.settingItem}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#4CAF50' }}
        thumbColor={Platform.OS === 'ios' ? '' : (value ? '#fff' : '#f4f3f4')}
        ios_backgroundColor="#3e3e3e"
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Account Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
  <Text style={styles.profileName}>John Doe</Text>
  <Text style={styles.profileEmail}>john.doe@example.com</Text>
  <TouchableOpacity 
    style={styles.editButton}
    onPress={() => navigation.navigate('EditProfile')}
  >
    <Text style={styles.editButtonText}>Edit Profile</Text>
  </TouchableOpacity>
</View>
</View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          {renderSettingItem('Notifications', notificationsEnabled, setNotificationsEnabled)}
          {renderSettingItem('Dark Mode', darkModeEnabled, setDarkModeEnabled)}
          {renderSettingItem('Auto Save', autoSaveEnabled, setAutoSaveEnabled)}
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => navigation.navigate('PrivacySettings')}
          >
            <Text style={styles.optionTitle}>Privacy Settings</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => console.log('Change Password')}
          >
            <Text style={styles.optionTitle}>Change Password</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.optionItem}
            onPress={() => navigation.navigate('HelpCenter')}
          >
            <Text style={styles.optionTitle}>Help Center</Text>
            <Text style={styles.optionArrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.dangerSection}>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.deleteAccountButton}
            onPress={handleDeleteAccount}
          >
            <Text style={styles.deleteAccountButtonText}>Delete Account</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  content: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  editButton: {
    marginTop: 8,
  },
  editButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  section: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e1e4e8',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    backgroundColor: '#f8f9fa',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
  },
  settingTitle: {
    fontSize: 16,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e1e4e8',
  },
  optionTitle: {
    fontSize: 16,
  },
  optionArrow: {
    fontSize: 18,
    color: '#666',
  },
  dangerSection: {
    marginTop: 24,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dc3545',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 16,
  },
  logoutButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deleteAccountButton: {
    backgroundColor: '#fff0f0',
    borderWidth: 1,
    borderColor: '#dc3545',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteAccountButtonText: {
    color: '#dc3545',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AccountSettingsScreen;