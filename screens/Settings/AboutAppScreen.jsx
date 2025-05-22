import React from 'react';
import {  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,  Linking} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const AboutAppScreen = ({ navigation }) => {
  // App information
  const appInfo = {
    version: '1.1.0',
    releaseDate: 'May 5, 2025',
    developer: 'Intagram Group. ',
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
  
  const handleOpenWebsite = async () => {
    const supported = await Linking.canOpenURL(appInfo.website);
    
    if (supported) {
      await Linking.openURL(appInfo.website);
    } else {
      console.error("Don't know how to open URI: " + appInfo.website);
    }
  };
  

  const handleViewLicenses = () => {
    navigation.navigate('Licenses');
  };

  const handleViewPrivacyPolicy = () => {
    navigation.navigate('PrivacyPolicy');
  };

  const handleViewTerms = () => {
    navigation.navigate('TermsOfService');
  };

  return (
    <ScrollView style={styles.container}>
      {/* App logo and name */}
      <View style={styles.headerSection}>
        <Image 
          source={require('../../assets/app-logo.png')} 
          style={styles.appLogo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>Instagram Clone Project</Text>
        <Text style={styles.appVersion}>Version {appInfo.version}</Text>
        <Text style={styles.releaseDate}>Released on {appInfo.releaseDate}</Text>
      </View>

      {/* App description */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About Us</Text>
        <Text style={styles.description}>
          As a team, we collaborated to create this Instagram clone project,
          showcasing our skills in mobile and web development. Our goal is was to create this App in our respective fields of expertise.
          We utilised React Native for the mobile app, Figma for the design, Django for the backend, and React for the web app.
          For collaboration, we used Slack and Microsoft Teams. 
        </Text>
      </View>

      {/* Features highlights */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        
        <View style={styles.featureItem}>
          <MaterialIcons name="people" size={24} color="#4a86f7" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Connect With Friends</Text>
            <Text style={styles.featureDescription}>
              Follow friends and family to stay updated on their latest posts and activities.
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialIcons name="photo-library" size={24} color="#4a86f7" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Share Your Moments</Text>
            <Text style={styles.featureDescription}>
              Post photos, videos, and updates to share your experiences with your network.
            </Text>
          </View>
        </View>

        <View style={styles.featureItem}>
          <MaterialIcons name="explore" size={24} color="#4a86f7" style={styles.featureIcon} />
          <View style={styles.featureContent}>
            <Text style={styles.featureTitle}>Sign Up/Log In</Text>
            <Text style={styles.featureDescription}>
              Sign Up/Log In to connect with friends.
            </Text>
          </View>
        </View>
      </View>

      {/* Team section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Our Team</Text>
        <View style={styles.teamGrid}>
          {teamMembers.map((member, index) => (
            <View key={index} style={styles.teamMember}>
              <View style={styles.teamMemberAvatar}>
                <Text style={styles.teamMemberInitial}>
                  {member.name.charAt(0)}
                </Text>
              </View>
              <Text style={styles.teamMemberName}>{member.name}</Text>
              <Text style={styles.teamMemberRole}>{member.role}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Contact and links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Check Out the Web App</Text>
        
        <TouchableOpacity style={styles.linkButton} onPress={handleOpenWebsite}>
          <MaterialIcons name="public" size={22} color="#4a86f7" />
          <Text style={styles.linkButtonText}>Visit Our Website</Text>
        </TouchableOpacity>
      </View>

      {/* Legal information */}
      <View style={[styles.section, styles.legalSection]}>
        <TouchableOpacity style={styles.legalLink} onPress={handleViewPrivacyPolicy}>
          <Text style={styles.legalLinkText}>Privacy Policy</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.legalLink} onPress={handleViewTerms}>
          <Text style={styles.legalLinkText}>Terms of Service</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.legalLink} onPress={handleViewLicenses}>
          <Text style={styles.legalLinkText}>Licenses</Text>
        </TouchableOpacity>
      </View>

      {/* Copyright notice */}
      <View style={styles.copyrightSection}>
        <Text style={styles.copyrightText}>
          © {new Date().getFullYear()} {appInfo.developer}. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    marginTop: 20,
    marginBottom: 20,
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
});

export default AboutAppScreen;