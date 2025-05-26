import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function CreateScreen({ navigation }) {
  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';

  const goBack = () => navigation.goBack();

  const navigateToUploadPost = () => {
    navigation.navigate('MainTabs', { screen: 'Upload' }); // Assuming 'Upload' is the route name for UploadScreen.jsx
  };

  const navigateToUploadStory = () => {
    navigation.navigate('UploadStory'); // Assuming 'UploadStory' is the route name for UploadStoryScreen.jsx
  };

  // Dynamic styles for dark mode
  const dynamicStyles = {
    container: {
      backgroundColor: isDark ? '#000000' : '#FFFFFF',
    },
    header: {
      backgroundColor: isDark ? '#121212' : '#FFFFFF',
      borderBottomColor: isDark ? '#333333' : '#DBDBDB',
    },
    text: {
      color: isDark ? '#FFFFFF' : '#000000',
    },
    menuItemText: {
      color: isDark ? '#FFFFFF' : '#262626',
    },
    iconColor: isDark ? '#FFFFFF' : '#555555',
    // Add other dynamic styles as needed
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.container]}>
      {/* Header */}
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={dynamicStyles.iconColor} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.text]}>Create</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: Platform.OS === 'android' ? 100 : 40 }}
      >
        {/* Menu Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.menuItem} onPress={navigateToUploadPost}>
            <View style={styles.menuItemLeft}>
              <Feather name="grid" size={22} color={dynamicStyles.iconColor} style={styles.menuItemIcon} />
              <Text style={[styles.menuItemText, dynamicStyles.menuItemText]}>Post</Text>
            </View>
            <Feather name="chevron-right" size={20} color={isDark ? "#777" : "#AAAAAA"} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={navigateToUploadStory}>
            <View style={styles.menuItemLeft}>
              <Feather name="clock" size={22} color={dynamicStyles.iconColor} style={styles.menuItemIcon} />
              <Text style={[styles.menuItemText, dynamicStyles.menuItemText]}>Story</Text>
            </View>
            <Feather name="chevron-right" size={20} color={isDark ? "#777" : "#AAAAAA"} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30, // Consistent with SettingsScreen
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  headerRight: { // Placeholder to help center the title
    width: 24,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    // borderBottomWidth: 0.5, // Optional: if you want separators between sections
    // borderBottomColor: '#DBDBDB',
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16, // Increased padding for better touch area
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemIcon: {
    marginRight: 20, // Increased spacing for icon
  },
  menuItemText: {
    fontSize: 17, // Slightly larger font size
  },
});