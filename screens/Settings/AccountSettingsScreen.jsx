import React, { useState, UseContext } from 'react';
import { StyleSheet, View, Text,TouchableOpacity,Switch, ScrollView, Image, Alert,Platform,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons'; // Import Feather
import { logout } from '../../redux/slices/authSlice';

const AccountSettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  // const [darkModeEnabled, setDarkModeEnabled] = useState(false); // Will be driven by Redux
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';
  const dispatch = useDispatch();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Logout', 
          onPress: () => {
            dispatch(logout());
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

  const renderSettingItem = (title, value, onValueChange, isDarkModeItem = false) => (
    <View style={[styles.settingItem, isDark && styles.darkSettingItem]}>
      <Text style={[styles.settingTitle, isDark && styles.darkText]}>{title}</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: isDark ? '#555' : '#767577', true: '#4CAF50' }}
        thumbColor={Platform.OS === 'ios' ? '' : (value ? (isDark ? '#4CAF50' : '#fff') : (isDark ? '#ccc' : '#f4f3f4'))}
        ios_backgroundColor={isDark ? "#555" :"#3e3e3e"}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.darkText]}>Account Settings</Text>
        <View style={styles.headerRightPlaceholder} /> 
      </View>

      <ScrollView style={styles.content}>
        <View style={[styles.profileSection, isDark && styles.darkProfileSection]}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=64' }}
            style={styles.profileImage}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, isDark && styles.darkText]}>User 1</Text>
            <Text style={[styles.profileEmail, isDark && styles.darkMutedText]}>user1@example.com</Text>
            <TouchableOpacity
  style={styles.editButton}
  onPress={() => navigation.navigate('EditProfile')}
>
              <Text style={[styles.editButtonText, isDark && styles.darkLinkText]}>Edit Profile</Text>
</TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, isDark && styles.darkSection]}>
          <Text style={[styles.sectionTitle, isDark && styles.darkSectionTitle]}>Preferences</Text>
          {renderSettingItem('Notifications', notificationsEnabled, setNotificationsEnabled)}
          {/* Dark mode toggle here would be redundant if global theme is used, but keeping for structure if needed locally */}
          {/* {renderSettingItem('Dark Mode', isDark, () => dispatch(toggleTheme()), true)} */}
          {renderSettingItem('Auto Save', autoSaveEnabled, setAutoSaveEnabled)}
        </View>
        
        <View style={[styles.section, isDark && styles.darkSection]}>
          <Text style={[styles.sectionTitle, isDark && styles.darkSectionTitle]}>Account</Text>
          <TouchableOpacity
            style={[styles.optionItem, isDark && styles.darkOptionItem]}
            onPress={() => navigation.navigate('PrivacySettings')}
          >
            <Text style={[styles.optionTitle, isDark && styles.darkText]}>Privacy Settings</Text>
            <Text style={[styles.optionArrow, isDark && styles.darkMutedText]}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.optionItem, isDark && styles.darkOptionItem]}
            onPress={() => console.log('Change Password')}
          >
            <Text style={[styles.optionTitle, isDark && styles.darkText]}>Change Password</Text>
            <Text style={[styles.optionArrow, isDark && styles.darkMutedText]}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.optionItem, isDark && styles.darkOptionItem]}
            onPress={() => navigation.navigate('HelpCenter')}
          >
            <Text style={[styles.optionTitle, isDark && styles.darkText]}>Help Center</Text>
            <Text style={[styles.optionArrow, isDark && styles.darkMutedText]}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.dangerSection}>
          <TouchableOpacity 
            style={[styles.logoutButton, isDark && styles.darkDangerButton]}
            onPress={handleLogout}
          >
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.deleteAccountButton, isDark && styles.darkDangerButton]}
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
    backgroundColor: '#f0f2f5', // Light mode background
    marginTop: 20,
  },
  darkContainer: {
    backgroundColor: '#000000', // Dark mode background
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkMutedText: {
    color: '#AAAAAA',
  },
  darkLinkText: {
    color: '#4dabf7', // A lighter blue for dark mode links
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Changed for better title centering
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e1e4e8',
    backgroundColor: '#fff',
  },
  darkHeader: {
    backgroundColor: '#121212',
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 5, // Matched SettingsScreen
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginLeft: 12, // Removed as justifyContent will handle spacing
    color: '#000', // Default header title color
  },
  headerRightPlaceholder: { // Added for centering title, similar to SettingsScreen
    width: 24, // Should match the effective width of the back button icon area
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
  darkProfileSection: {
    backgroundColor: '#121212',
    borderBottomColor: '#333333',
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
    borderColor: '#e1e4e8', // Default border color
  },
  darkSection: {
    backgroundColor: '#121212',
    borderColor: '#333333',
  },
  sectionTitle: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    backgroundColor: '#f0f2f5', // Light mode section title background
  },
  darkSectionTitle: {
    color: '#AAAAAA',
    backgroundColor: '#000000', // Dark mode section title background
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
  darkSettingItem: {
    borderTopColor: '#333333',
  },
  settingTitle: {
    fontSize: 16,
    color: '#000', // Default setting title color
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
  darkOptionItem: {
    borderTopColor: '#333333',
  },
  optionTitle: {
    fontSize: 16,
    color: '#000', // Default option title color
  },
  optionArrow: {
    fontSize: 18,
    color: '#666',
  },
  dangerSection: {
    flexDirection: 'row', // Arrange children horizontally
    justifyContent: 'space-between', // Space out the buttons
    alignItems: 'center', // Vertically align buttons
    marginTop: 24,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#FF3B30', // Match SettingsScreen dangerButton
    borderRadius: 5,             // Match SettingsScreen dangerButton
    alignItems: 'center',
    flex: 1, // Take equal space
    marginRight: 8, // Add space between buttons
    paddingVertical: 10, // Slightly reduced padding for smaller height
  },
  darkLogoutButton: {
    backgroundColor: '#FF3B30', // Keep it the same red for dark mode, consistent with SettingsScreen
  },
  logoutButtonText: {
    color: '#FFFFFF',            // Match SettingsScreen dangerButtonText
    fontSize: 16,
    fontWeight: '600',           // Match SettingsScreen dangerButtonText
  },
  // Shared dark style for both danger buttons
  darkDangerButton: {
    backgroundColor: '#FF3B30', // Keep the same red in dark mode
  },
  deleteAccountButton: {
    backgroundColor: '#FF3B30', // Match Logout button
    borderRadius: 5,             // Match Logout button
    alignItems: 'center',
    flex: 1, // Take equal space
    paddingVertical: 10, // Slightly reduced padding for smaller height
  },
  deleteAccountButtonText: {
    color: '#FFFFFF',            // Match Logout button text
    fontSize: 16,
    fontWeight: '600',           // Match Logout button text
  },
});

export default AccountSettingsScreen;