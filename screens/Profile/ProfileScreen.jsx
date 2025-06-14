import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Platform, StatusBar} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { fetchUserProfile } from '../../redux/slices/userSlice';

export default function ProfileScreen({ navigation, route }) {
  const dispatch = useDispatch();
const { user, loading, error } = useSelector(state => state.user);

// Fetch user profile on mount
useEffect(() => {
  dispatch(fetchUserProfile());
}, []);

  const [activeTab, setActiveTab] = useState('posts');

  // Navigate to Edit Profile screen with current user data
  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { user });
  };

  const postsData = Array(9).fill().map((_, index) => ({
    id: `post-${index}`,
    imageUrl: `https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=500&q=60`,
  }));

  const taggedData = Array(5).fill().map((_, index) => ({
    id: `tagged-${index}`,
    imageUrl: `https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=500&q=60`,
    taggedBy: `user_${Math.floor(Math.random() * 100)}`,
  }));

  const navigateToPostDetail = (item, type) => {
    navigation.navigate('PostDetail', { item, type });
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity style={styles.postItemContainer} onPress={() => navigateToPostDetail(item, 'post')} activeOpacity={0.8}>
      <View style={styles.greyPlaceholder} />
    </TouchableOpacity>
  );

  const renderTaggedItem = ({ item }) => (
    <TouchableOpacity style={styles.taggedContainer} onPress={() => navigateToPostDetail(item, 'tagged')} activeOpacity={0.8}>
      <View style={styles.greyPlaceholder} />
      <View style={styles.taggedIndicator}>
        <Feather name="user" size={12} color="white" />
      </View>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return (
          <FlatList
            data={postsData}
            renderItem={renderPostItem}
            keyExtractor={item => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
          />
        );
      case 'tagged':
        return (
          <FlatList
            data={taggedData}
            renderItem={renderTaggedItem}
            keyExtractor={item => item.id}
            numColumns={3}
            scrollEnabled={false}
            contentContainerStyle={styles.gridContainer}
          />
        );
      default:
        return null;
    }
  };

if (loading) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading user profile...</Text>
    </SafeAreaView>
  );
}

if (error) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center', marginTop: 50 }}>Error: {error}</Text>
    </SafeAreaView>
  );
}

// Add a check for the user object itself after loading and error checks
if (!user) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={{ textAlign: 'center', marginTop: 50 }}>User profile not available.</Text>
    </SafeAreaView>
  );
}


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Create')}>
              <Feather name="plus-square" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Settings')}>
              <Feather name="menu" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Image source={{ uri: user.profile_picture}} style={styles.avatar} />
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.post_count}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers_count}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following_count}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.name}>{user.full_name}</Text>
          <Text style={styles.bio}>{user.bio}</Text>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Feather name="share" size={16} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.highlightsSection}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.highlightsScroll}>
            <View style={styles.highlightItem}>
              <View style={styles.highlightCircle}>
                <Feather name="plus" size={24} color="black" />
              </View>
              <Text style={styles.highlightText}>New</Text>
            </View>
          </ScrollView>
        </View>

        <View style={styles.tabBar}>
          <TouchableOpacity style={[styles.tab, activeTab === 'posts' && styles.activeTab]} onPress={() => setActiveTab('posts')}>
            <Feather name="grid" size={24} color={activeTab === 'posts' ? 'black' : 'gray'} />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, activeTab === 'tagged' && styles.activeTab]} onPress={() => setActiveTab('tagged')}>
            <Feather name="user" size={24} color={activeTab === 'tagged' ? 'black' : 'gray'} />
          </TouchableOpacity>
        </View>

        <View style={styles.tabContent}>
          {renderTabContent()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 50,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
  tabContent: {
    width: '100%',
  },
  postItemContainer: {
    width: '33.33%',
    padding: 1,
  },
  gridPhoto: {
    width: '100%',
    aspectRatio: 1,
  },
  greyPlaceholder: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#EFEFEF', // A light grey color
  },
  taggedContainer: {
    width: '33.33%',
    position: 'relative',
    padding: 1,
  },
  taggedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },

});