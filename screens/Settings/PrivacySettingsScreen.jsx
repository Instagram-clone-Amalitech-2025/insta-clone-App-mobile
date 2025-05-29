import React, { useState, useEffect } from 'react';
import { View, Text,  StyleSheet,  ScrollView,  Switch,  TouchableOpacity, ActivityIndicator,  Alert,  Platform} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const PrivacySettingsScreen = ({ navigation }) => {
  // State for privacy settings
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    locationTracking: false,
    analyticsCollection: true,
    dataSharing: false,
    personalisedAds: true,
    faceIdLogin: Platform.OS === 'ios', // Only relevant for iOS
    biometricLogin: Platform.OS === 'android', // Only relevant for Android
    saveSearchHistory: true,
    twoFactorAuth: false,
  });

  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';
  
  // Load saved settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem('privacySettings');
        if (savedSettings !== null) {
          setSettings(JSON.parse(savedSettings));
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to load privacy settings:', error);
        setLoading(false);
      }
    };
    
    loadSettings();
  }, []);
  
  // Save settings when they change
  const saveSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('privacySettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Failed to save privacy settings:', error);
      Alert.alert('Error', 'Failed to save settings. Please try again.');
    }
  };
  
  // Handle toggle changes
  const handleToggle = (key) => {
    const newSettings = { ...settings, [key]: !settings[key] };
    setSettings(newSettings);
    saveSettings(newSettings);
  };
  
  // Handle option to delete all data
  const handleDeleteData = () => {
    Alert.alert(
      'Delete All Data',
      'Are you sure you want to delete all your data? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: () => {
            // Simulating deletion process
            setLoading(true);
            setTimeout(() => {
              Alert.alert('Success', 'All data has been deleted successfully.');
              setLoading(false);
            }, 2000);
          }
        }
      ]
    );
  };
  
  // Handle export data option
  const handleExportData = () => {
    Alert.alert(
      'Export Data',
      'Your data will be exported and sent to your registered email address.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Export', 
          onPress: () => {
            // Simulating export process
            setLoading(true);
            setTimeout(() => {
              Alert.alert('Success', 'Data export initiated. You will receive an email shortly.');
              setLoading(false);
            }, 2000);
          }
        }
      ]
    );
  };
  
  // Navigate to detailed privacy policy
  const handleViewPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };
  
  if (loading) {
    return (
      <View style={[styles.loadingContainer, isDark && styles.darkContainer]}>
        <ActivityIndicator size="large" color={isDark ? "#FFFFFF" : "#0066cc"} />
        <Text style={[styles.loadingText, isDark && styles.darkMutedText]}>Loading settings...</Text>
      </View>
    );
  }
  
  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={isDark ? "#4dabf7" : "#0066cc"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.darkText]}>Privacy Settings</Text>
      </View>
      
      <ScrollView style={[styles.scrollView, isDark && styles.darkContainer]}>
        <View style={[styles.sectionContainer, isDark && styles.darkSectionContainer]}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>App Permissions</Text>
          
          <View style={[styles.settingRow, isDark && styles.darkSettingRow]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, isDark && styles.darkText]}>Location Tracking</Text>
              <Text style={[styles.settingDescription, isDark && styles.darkMutedText]}>Allow app to track your location</Text>
            </View>
            <Switch
              value={settings.locationTracking}
              onValueChange={() => handleToggle('locationTracking')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.locationTracking ? '#0066cc' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.settingRow, isDark && styles.darkSettingRow]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, isDark && styles.darkText]}>Analytics Collection</Text>
              <Text style={[styles.settingDescription, isDark && styles.darkMutedText]}>Allow app to collect usage data</Text>
            </View>
            <Switch
              value={settings.analyticsCollection}
              onValueChange={() => handleToggle('analyticsCollection')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.analyticsCollection ? '#0066cc' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.sectionContainer, isDark && styles.darkSectionContainer]}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Data Sharing</Text>
          
          <View style={[styles.settingRow, isDark && styles.darkSettingRow]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, isDark && styles.darkText]}>Share with Third Parties</Text>
              <Text style={[styles.settingDescription, isDark && styles.darkMutedText]}>Allow data sharing with partners</Text>
            </View>
            <Switch
              value={settings.dataSharing}
              onValueChange={() => handleToggle('dataSharing')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.dataSharing ? '#0066cc' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.settingRow, isDark && styles.darkSettingRow]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, isDark && styles.darkText]}>Personalized Ads</Text>
              <Text style={[styles.settingDescription, isDark && styles.darkMutedText]}>See ads based on your activity</Text>
            </View>
            <Switch
              value={settings.personalisedAds}
              onValueChange={() => handleToggle('personalisedAds')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.personalisedAds ? '#0066cc' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.sectionContainer, isDark && styles.darkSectionContainer]}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Security</Text>
          
          {Platform.OS === 'ios' && (
            <View style={[styles.settingRow, isDark && styles.darkSettingRow]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, isDark && styles.darkText]}>Face ID Login</Text>
                <Text style={[styles.settingDescription, isDark && styles.darkMutedText]}>Use Face ID for authentication</Text>
              </View>
              <Switch
                value={settings.faceIdLogin}
                onValueChange={() => handleToggle('faceIdLogin')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.faceIdLogin ? '#0066cc' : '#f4f3f4'}
              />
            </View>
          )}
          
          {Platform.OS === 'android' && (
            <View style={[styles.settingRow, isDark && styles.darkSettingRow]}>
              <View style={styles.settingInfo}>
                <Text style={[styles.settingTitle, isDark && styles.darkText]}>Biometric Login</Text>
                <Text style={[styles.settingDescription, isDark && styles.darkMutedText]}>Use fingerprint for authentication</Text>
              </View>
              <Switch
                value={settings.biometricLogin}
                onValueChange={() => handleToggle('biometricLogin')}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={settings.biometricLogin ? '#0066cc' : '#f4f3f4'}
              />
            </View>
          )}
          
          <View style={[styles.settingRow, isDark && styles.darkSettingRow]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, isDark && styles.darkText]}>Save Search History</Text>
              <Text style={[styles.settingDescription, isDark && styles.darkMutedText]}>Store your search history</Text>
            </View>
            <Switch
              value={settings.saveSearchHistory}
              onValueChange={() => handleToggle('saveSearchHistory')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.saveSearchHistory ? '#0066cc' : '#f4f3f4'}
            />
          </View>
          
          <View style={[styles.settingRow, isDark && styles.darkSettingRow]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingTitle, isDark && styles.darkText]}>Two-Factor Authentication</Text>
              <Text style={[styles.settingDescription, isDark && styles.darkMutedText]}>Add extra security to your account</Text>
            </View>
            <Switch
              value={settings.twoFactorAuth}
              onValueChange={() => handleToggle('twoFactorAuth')}
              trackColor={{ false: '#767577', true: '#81b0ff' }}
              thumbColor={settings.twoFactorAuth ? '#0066cc' : '#f4f3f4'}
            />
          </View>
        </View>
        
        <View style={[styles.sectionContainer, isDark && styles.darkSectionContainer]}>
          <Text style={[styles.sectionTitle, isDark && styles.darkText]}>Your Data</Text>
          
          <TouchableOpacity 
            style={[styles.actionButton, isDark && styles.darkActionButton]}
            onPress={handleExportData}
          >
            <Ionicons name="download-outline" size={22} color={isDark ? "#4dabf7" : "#0066cc"} />
            <Text style={[styles.actionButtonText, isDark && styles.darkLinkText]}>Export My Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.deleteButton, isDark && styles.darkActionButton]}
            onPress={handleDeleteData}
          >
            <Ionicons name="trash-outline" size={22} color="#ff3b30" />
            <Text style={[styles.actionButtonText, styles.deleteButtonText]}>Delete All My Data</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, isDark && styles.darkActionButton]}
            onPress={handleViewPrivacyPolicy}
          >
            <Ionicons name="document-text-outline" size={22} color={isDark ? "#4dabf7" : "#0066cc"} />
            <Text style={[styles.actionButtonText, isDark && styles.darkLinkText]}>View Privacy Policy</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={[styles.footerText, isDark && styles.darkMutedText]}>
          Last updated: May 13, 2025
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    marginTop: 0,
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  darkHeader: {
    backgroundColor: '#121212',
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#000000',
  },
  scrollView: {
    flex: 1,
  },
  sectionContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  darkSectionContainer: {
    backgroundColor: '#121212',
    borderColor: '#333333',
    shadowColor: '#000',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000000',
  },
  darkSectionTitle: {
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  darkSettingRow: {
    borderBottomColor: '#333333',
  },
  settingInfo: {
    flex: 1,
    paddingRight: 8,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  settingDescription: {
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  darkActionButton: {
    borderBottomColor: '#333333',
  },
  actionButtonText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#0066cc',
  },
  darkLinkText: {
    color: '#4dabf7',
  },
  deleteButton: {
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  deleteButtonText: {
    color: '#ff3b30',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666666',
  },
  footerText: {
    marginTop: 20,
    marginBottom: 32,
    textAlign: 'center',
    fontSize: 12,
    color: '#999999',
  },
});

export default PrivacySettingsScreen;