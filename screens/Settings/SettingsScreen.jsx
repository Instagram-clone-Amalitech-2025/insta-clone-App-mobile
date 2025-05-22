import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Switch, Platform, Alert} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

export default function SettingsScreen({ navigation }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [privateAccount, setPrivateAccount] = useState(true);

  const toggleNotifications = () => setNotifications(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const togglePrivateAccount = () => setPrivateAccount(prev => !prev);

  const dispatch = useDispatch();

  const goBack = () => navigation.goBack();
  const navigateToAccount = () => navigation.navigate('AccountSettings');
  const navigateToPrivacy = () => navigation.navigate('PrivacySettings');
  const navigateToHelp = () => navigation.navigate('HelpCenter');
  const navigateToAbout = () => navigation.navigate('AboutApp');
  const navigateToSaved = () => navigation.navigate('SavedPosts');
  const navigateToArchived = () => navigation.navigate('ArchivedPosts');

  const handleLogout = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => { dispatch(logout()); },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 100 : 40 }}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToAccount}>
            <View style={styles.menuItemLeft}>
              <Feather name="user" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Account Information</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToPrivacy}>
            <View style={styles.menuItemLeft}>
              <Feather name="lock" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Privacy</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToSaved}>
            <View style={styles.menuItemLeft}>
              <Feather name="bookmark" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Saved Posts</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToArchived}>
            <View style={styles.menuItemLeft}>
              <Feather name="archive" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Archived Stories</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="eye" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Private Account</Text>
            </View>
            <Switch
              trackColor={{ false: "#DDDDDD", true: "#34C759" }}
              thumbColor={"#FFFFFF"}
              ios_backgroundColor="#DDDDDD"
              onValueChange={togglePrivateAccount}
              value={privateAccount}
            />
          </View>
        </View>

        {/* Preferences Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="bell" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Notifications</Text>
            </View>
            <Switch
              trackColor={{ false: "#DDDDDD", true: "#34C759" }}
              thumbColor={"#FFFFFF"}
              ios_backgroundColor="#DDDDDD"
              onValueChange={toggleNotifications}
              value={notifications}
            />
          </View>

          <View style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="moon" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Dark Mode</Text>
            </View>
            <Switch
              trackColor={{ false: "#DDDDDD", true: "#34C759" }}
              thumbColor={"#FFFFFF"}
              ios_backgroundColor="#DDDDDD"
              onValueChange={toggleDarkMode}
              value={darkMode}
            />
          </View>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemLeft}>
              <Feather name="globe" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Language</Text>
            </View>
            <View style={styles.menuItemRight}>
              <Text style={styles.menuItemValue}>English</Text>
              <Feather name="chevron-right" size={20} color="#AAAAAA" />
            </View>
          </TouchableOpacity>
        </View>

        {/* Support & About Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support & About</Text>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToHelp}>
            <View style={styles.menuItemLeft}>
              <Feather name="help-circle" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>Help Center</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#AAAAAA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToAbout}>
            <View style={styles.menuItemLeft}>
              <Feather name="info" size={20} color="#555" style={styles.menuItemIcon} />
              <Text style={styles.menuItemText}>About</Text>
            </View>
            <Feather name="chevron-right" size={20} color="#AAAAAA" />
          </TouchableOpacity>
        </View>

        {/* Danger Zone */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.dangerButton} onPress={handleLogout}>
            <Text style={styles.dangerButtonText}>Log Out</Text>
          </TouchableOpacity>
        </View>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginTop: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: {
    width: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 15,
  },
  menuItemText: {
    fontSize: 16,
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemValue: {
    fontSize: 16,
    color: '#777',
    marginRight: 10,
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 5,
    paddingVertical: 12,
    marginVertical: 10,
    alignItems: 'center',
  },
  dangerButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    color: '#999',
    fontSize: 14,
  },
});
