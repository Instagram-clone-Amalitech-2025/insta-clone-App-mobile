import React from 'react';
import {  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,  Linking} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux'; 

const AboutAppScreen = ({ navigation }) => {
  // App information
  const appInfo = {
    version: '1.1.0',
    releaseDate: 'May 5, 2025',
    developer: 'Intagram Group. ',
    website: 'https://example.com', // Added dummy website for handleOpenWebsite
  };

  // Team members
  const teamMembers = [
    { name: 'Kofi Atta Agyare', role: 'Mobile Developer(React Native)' },
    { name: 'Kingsley Thompson', role: 'Backend Developer(Django)' },
    { name: 'Ursula Yankson', role: 'Product Designer' },
    { name: 'Raymond Adoe', role: 'Web Developer(React)' },
    { name: 'George Hayford', role: 'Backend Developer(Django)' },
    { name: 'Felix Owusu Brobbey', role: 'Backend Developer(Django)' },
    { name: 'Vincent Dorkenoo', role: 'Cyber Security Analyst' },
  ];
  
  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';

  const handleOpenWebsite = async () => {
    const supported = await Linking.canOpenURL(appInfo.website);
    
    if (supported) {
      await Linking.openURL(appInfo.website);
    } else {
      console.error("Don't know how to open URI: " + appInfo.website);
    }
  };
  
  const goBack = () => navigation.goBack();


  const handleViewLicenses = () => {
    navigation.navigate('Licenses');
  };

  const handleViewPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleViewTerms = () => {
    navigation.navigate('TermsOfService');
  };

  // Dark mode styles (can be moved to a shared theme file later)
  const dynamicStyles = {
    text: isDark ? styles.darkText : styles.lightText,
    mutedText: isDark ? styles.darkMutedText : styles.lightMutedText,
    sectionTitle: isDark ? styles.darkSectionTitleText : styles.lightSectionTitleText,
    containerBackground: isDark ? styles.darkContainerBackground : styles.lightContainerBackground,
    sectionBackground: isDark ? styles.darkSectionBackground : styles.lightSectionBackground,
    headerBackground: isDark ? styles.darkHeaderBackground : styles.lightHeaderBackground,
    headerBorder: isDark ? styles.darkHeaderBorder : styles.lightHeaderBorder,
  };

  return (
    <SafeAreaView style={[styles.container, dynamicStyles.containerBackground]}>
      
      <View style={[styles.header, dynamicStyles.headerBackground, dynamicStyles.headerBorder]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, dynamicStyles.text]}>About</Text>
        <View style={styles.headerRightPlaceholder} />       </View>

      <ScrollView style={[styles.scrollViewContent, dynamicStyles.containerBackground]}>
      
      <View style={[styles.headerSection, dynamicStyles.sectionBackground]}>
        <Image 
          source={require('../../assets/app-logo.png')} 
          style={styles.appLogo}
          resizeMode="contain"
        />
        <Text style={[styles.appName, dynamicStyles.text]}>Instagram Clone Project</Text>
        <Text style={[styles.appVersion, dynamicStyles.mutedText]}>Version {appInfo.version}</Text>
        <Text style={[styles.releaseDate, dynamicStyles.mutedText]}>Released on {appInfo.releaseDate}</Text>
      </View>

      <View style={[styles.section, dynamicStyles.sectionBackground]}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>About Us</Text>
        <Text style={[styles.description, dynamicStyles.text]}>
          As a team, we collaborated to create this Instagram clone project,
          showcasing our skills in mobile and web development. Our goal is was to create this App in our respective fields of expertise.
          We utilised React Native for the mobile app, Figma for the design, Django for the backend, and React for the web app.
          For collaboration, we used Slack and Microsoft Teams. 
        </Text>
      </View>

      <View style={[styles.section, dynamicStyles.sectionBackground]}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Key Features</Text>
        
        <View style={styles.featureItem}>
          <MaterialIcons name="people" size={24} color="#4a86f7" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, dynamicStyles.text]}>Connect With Friends</Text>
            <Text style={[styles.featureDescription, dynamicStyles.text]}>
              Follow friends and family to stay updated on their latest posts and activities.
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialIcons name="photo-library" size={24} color="#4a86f7" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, dynamicStyles.text]}>Share Your Moments</Text>
            <Text style={[styles.featureDescription, dynamicStyles.text]}>
              Post photos, videos, and updates to share your experiences with your network.
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialIcons name="explore" size={24} color="#4a86f7" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={[styles.featureTitle, dynamicStyles.text]}>Sign Up/Log In</Text>
            <Text style={[styles.featureDescription, dynamicStyles.text]}>
              Sign Up/Log In to connect with friends.
            </Text>
          </View>
        </View>
      </View>

      <View style={[styles.section, dynamicStyles.sectionBackground]}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Our Team</Text>
        <View style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <View style={styles.teamMemberAvatar}>
                <Text style={styles.teamMemberInitial}>
                  {member.name.charAt(0)}
                </Text>
              </View>
              <Text style={[styles.teamMemberName, dynamicStyles.text]}>{member.name}</Text>
              <Text style={[styles.teamMemberRole, dynamicStyles.mutedText]}>{member.role}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.section, dynamicStyles.sectionBackground]}>
        <Text style={[styles.sectionTitle, dynamicStyles.sectionTitle]}>Check Out the Web App</Text>
        
        <TouchableOpacity style={styles.linkButton} onPress={handleOpenWebsite}>
          <MaterialIcons name="public" size={22} color="#4a86f7" />
          <Text style={styles.linkButtonText}>Visit Our Website</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.section, styles.legalSection, dynamicStyles.sectionBackground]}>
        <TouchableOpacity style={styles.legalLink} onPress={handleViewPrivacyPolicy}>
          <Text style={[styles.legalLinkText, dynamicStyles.mutedText]}>Privacy Policy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.legalLink} onPress={handleViewTerms}>
          <Text style={[styles.legalLinkText, dynamicStyles.mutedText]}>Terms of Service</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.legalLink} onPress={handleViewLicenses}>
          <Text style={[styles.legalLinkText, dynamicStyles.mutedText]}>Licenses</Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.copyrightSection, dynamicStyles.sectionBackground]}>
        <Text style={[styles.copyrightText, dynamicStyles.mutedText]}>
          © {new Date().getFullYear()} {appInfo.developer}. All rights reserved.
        </Text>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  lightContainerBackground: {
    backgroundColor: '#f9f9f9',
  },
  darkContainerBackground: {
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 12, 
  },
  lightHeaderBackground: {
    backgroundColor: '#FFFFFF',
  },
  darkHeaderBackground: {
    backgroundColor: '#121212',
  },
  lightHeaderBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  darkHeaderBorder: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#333333',
  },
  backButton: {
    padding: 5, 
  },
  headerTitle: {
    fontSize: 18, 
    fontWeight: '600', 
  },
  headerRightPlaceholder: { 
        width: 24,
  },
  scrollViewContent: {
    flex: 1,
  },
  headerSection: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: '#f9f9f9',
  },
  appLogo: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  lightSectionBackground: {
    backgroundColor: '#ffffff', 
  },
  darkSectionBackground: {
    backgroundColor: '#121212',
  },
  appName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333333',
  },
  appVersion: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
  },
  releaseDate: {
    fontSize: 12,
    color: '#888888',
    marginTop: 4,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  lightText: {
    color: '#333333', 
  },
  darkText: {
    color: '#FFFFFF', 
  },
  lightMutedText: {
    color: '#666666',
  },
  darkMutedText: {
    color: '#AAAAAA',
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#666666',
  },
  featureItem: {
    flexDirection: 'row',
    marginBottom: 18,
    alignItems: 'flex-start',
  },
  featureIcon: {
    marginRight: 16,
    marginTop: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  teamMember: {
    width: '48%',
    marginBottom: 20,
    alignItems: 'center',
  },
  teamMemberAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#4a86f7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  teamMemberInitial: {
    fontSize: 28,
    fontWeight: '600',
    color: '#ffffff',
  },
  teamMemberName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
  teamMemberRole: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
    marginTop: 2,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#f5f8ff',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  linkButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4a86f7',
    marginLeft: 12,
  },
  legalSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  legalLink: {
    padding: 8,
  },
  legalLinkText: {
    fontSize: 14,
    color: '#666666',
  },
  copyrightSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999999',
  },
  lightSectionTitleText: { 
    color: '#333333',
  },
  darkSectionTitleText: {
    color: '#DDDDDD', 
  },
});

export default AboutAppScreen;