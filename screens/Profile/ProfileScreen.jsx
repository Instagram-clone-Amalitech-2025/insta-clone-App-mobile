import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function InstagramProfileScreen({ navigation, route }) {
  const [user, setUser] = useState({
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Mobile Developer | React Native Enthusiast',
    avatar: 'https://i.pravatar.cc/150?img=12',
    posts: 24,
    followers: 485,
    following: 321,
    website: '',
    phone: '',
    email: 'johndoe@example.com',
    gender: ''
  });

  // Update user data when returning from EditProfileScreen
  useEffect(() => {
    if (route.params?.updatedUser) {
      setUser(route.params.updatedUser);
    }
  }, [route.params?.updatedUser]);

  // Navigate to Edit Profile screen with current user data
  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { user });
  };

  // Placeholder image grid
  const placeholderPosts = Array(9).fill('https://i.pravatar.cc/150?img=');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with username and settings */}
        <View style={styles.header}>
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="plus-square" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile info section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.posts}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        {/* Bio section */}
        <View style={styles.bioSection}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        {/* Action buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Feather name="share" size={16} color="black" />
          </TouchableOpacity>
        </View>

        {/* Story highlights */}
        <View style={styles.highlightsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsScroll}>
            <View style={styles.highlightItem}>
              <View style={styles.highlightCircle}>
                <Feather name="plus" size={24} color="black" />
              </View>
              <Text style={styles.highlightText}>New</Text>
            </View>
            {/* Additional highlights would go here */}
          </ScrollView>
        </View>

        {/* Tab view (Posts, Reels, Tagged) */}
        <View style={styles.tabBar}>
          <TouchableOpacity style={[styles.tab, styles.activeTab]}>
            <Feather name="grid" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Feather name="film" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Feather name="user" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Photo grid */}
        <View style={styles.photoGrid}>
          {placeholderPosts.map((post, index) => (
            <Image 
              key={index} 
              source={{ uri: `${post}${index + 1}` }} 
              style={styles.gridPhoto} 
            />
          ))}
        </View>
      </ScrollView>
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  username: {
    fontSize: 18,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  bioSection: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  bio: {
    fontSize: 14,
    marginTop: 3,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 4,
    paddingVertical: 7,
    alignItems: 'center',
    marginRight: 5,
  },
  editButtonText: {
    fontWeight: '600',
    fontSize: 14,
  },
  shareButton: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#DBDBDB',
    borderRadius: 4,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightsSection: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  highlightsScroll: {
    paddingLeft: 15,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  highlightCircle: {
    width: 65,
    height: 65,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightText: {
    fontSize: 12,
    marginTop: 3,
  },
  tabBar: {
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: '#DBDBDB',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridPhoto: {
    width: '33.3%',
    aspectRatio: 1,
    borderWidth: 0.5,
    borderColor: 'white',
  },

});