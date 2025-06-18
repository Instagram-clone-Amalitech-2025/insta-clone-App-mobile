import React, { useState, UseContext } from 'react';
import { StyleSheet, View, Text,TouchableOpacity,Switch, ScrollView, Image, Alert,Platform,} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { logout } from '../../redux/slices/authSlice';

const AccountSettingsScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
   const [privateAccountEnabled, setprivateAccountEnabled] = useState(true);

  const appTheme = useSelector((state) => state.theme.theme);
  const user = useSelector((state) => state.user.user);
  const isDark = appTheme === 'dark';
  const dispatch = useDispatch();

   const handleEditProfile = () => {
  if (!user) {
    Alert.alert('Error', 'User data not available');
    return;
  }

  navigation.navigate('EditProfile', { user });
};


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
  source={{ uri: user?.profile_picture || 'https://i.pravatar.cc/150?img=64' }}
  style={styles.profileImage}
/>

          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, isDark && styles.darkText]}>
  {user?.full_name || user?.username || 'Unknown User'}
</Text>
<Text style={[styles.profileEmail, isDark && styles.darkMutedText]}>
  {user?.email || 'No email available'}
</Text>

            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
                        <Text style={styles.editButtonText}>Edit Profile</Text>
                      </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.section, isDark && styles.darkSection]}>
          <Text style={[styles.sectionTitle, isDark && styles.darkSectionTitle]}>Preferences</Text>
          {renderSettingItem('Notifications', notificationsEnabled, setNotificationsEnabled)}
          {renderSettingItem('Private Account', privateAccountEnabled, setprivateAccountEnabled)}
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
    backgroundColor: '#f0f2f5', 
  },
  darkContainer: {
    backgroundColor: '#000000',
  },
  darkText: {
    color: '#FFFFFF',
  },
  darkMutedText: {
    color: '#AAAAAA',
  },
  darkLinkText: {
    color: '#4dabf7', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', 
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
    padding: 5, 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  headerRightPlaceholder: {
    width: 24,
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
    borderColor: '#e1e4e8',
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
    backgroundColor: '#f0f2f5',
  },
  darkSectionTitle: {
    color: '#AAAAAA',
    backgroundColor: '#000000',
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
    color: '#000',
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
    color: '#000',
  },
  optionArrow: {
    fontSize: 18,
    color: '#666',
  },
  dangerSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 40,
    paddingHorizontal: 16,
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    paddingVertical: 10,
  },
  darkLogoutButton: {
    backgroundColor: '#FF3B30',
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  darkDangerButton: {
    backgroundColor: '#FF3B30',
  },
  deleteAccountButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    alignItems: 'center',
    flex: 1,
    paddingVertical: 10,
  },
  deleteAccountButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AccountSettingsScreen;