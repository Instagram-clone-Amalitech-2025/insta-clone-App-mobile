import React, { useState, useEffect, useRef } from 'react';
import {  View,  Text,  StyleSheet,  Image,  TouchableOpacity,  ScrollView,  SafeAreaView,  FlatList, Modal, Animated} from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen({ navigation, route }) {
  const [user, setUser] = useState({
    username: 'User1',
    name: 'User 1',
    bio: 'Mobile Developer | React Native Enthusiast',
    avatar: '/assets/pravatar.jpg',
    posts: 24,
    followers: 1000,
    following: 321,
    website: '',
    phone: '',
    email: 'user1@example.com',
    gender: ''
  });
  
  // Add active tab state
  const [activeTab, setActiveTab] = useState('posts');
  
  // Add menu state
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnimation = useRef(new Animated.Value(0)).current;

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

  // Toggle menu visibility with animation
  const toggleMenu = () => {
    if (menuVisible) {
      Animated.timing(menuAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(() => {
        setMenuVisible(false);
      });
    } else {
      setMenuVisible(true);
      Animated.timing(menuAnimation, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  // Navigate to different screens from menu
  const navigateToSettings = () => {
    toggleMenu();
    navigation.navigate('Settings');
  };

  const navigateToSaved = () => {
    toggleMenu();
    navigation.navigate('SavedPosts');
  };

  const navigateToArchived = () => {
    toggleMenu();
    navigation.navigate('ArchivedPosts');
  };

  // Handle logout
  const handleLogout = () => {
    toggleMenu();
    // Add logout logic here
    alert('Logged out successfully');
    // Navigate to Login screen or Auth stack
    // navigation.navigate('Login');
  };

  // Create data for each tab
  //Post data
  const postsData = Array(9).fill().map((_, index) => ({
  id: `post-${index}`,
  imageFile: `post${index + 1}.jpg`, // Add images as post1.jpg, post2.jpg, etc.
}));

  //Reels data
 const reelsData = Array(6).fill().map((_, index) => ({
  id: `reel-${index}`,
  thumbnailFile: `reel${index + 1}.jpg`,
  views: Math.floor(Math.random() * 10000) + 100,
}));

  //Tagged data
 const taggedData = Array(5).fill().map((_, index) => ({
  id: `tagged-${index}`,
  imageFile: `tagged${index + 1}.jpg`,
  taggedBy: `user_${Math.floor(Math.random() * 100)}`,
}));

  // Navigate to post detail screen
  const navigateToPostDetail = (item, type) => {
    navigation.navigate('PostDetail', { item, type });
  };

  // Render post grid item
  const renderPostItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.postItemContainer}
      onPress={() => navigateToPostDetail(item, 'post')}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.gridPhoto} 
      />
    </TouchableOpacity>
  );

  // Render reel grid item
  const renderReelItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.reelContainer}
      onPress={() => navigateToPostDetail(item, 'reel')}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.thumbnailUrl }} 
        style={styles.gridPhoto} 
      />
      <View style={styles.reelOverlay}>
        <Feather name="play" size={14} color="white" />
        <Text style={styles.reelViewCount}>{item.views}</Text>
      </View>
    </TouchableOpacity>
  );

  // Render tagged grid item
  const renderTaggedItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.taggedContainer}
      onPress={() => navigateToPostDetail(item, 'tagged')}
      activeOpacity={0.8}
    >
      <Image 
        source={{ uri: item.imageUrl }} 
        style={styles.gridPhoto} 
      />
      <View style={styles.taggedIndicator}>
        <Feather name="user" size={12} color="white" />
      </View>
    </TouchableOpacity>
  );

  // Render content based on active tab
  const renderTabContent = () => {
    switch(activeTab) {
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
      case 'reels':
        return (
          <FlatList
            data={reelsData}
            renderItem={renderReelItem}
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

  // Menu animation styles
  const menuContainerStyle = {
    transform: [
      {
        translateY: menuAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [-300, 0],
        }),
      },
    ],
    opacity: menuAnimation,
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Menu Modal */}
      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="none"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={toggleMenu}
        >
          <Animated.View 
            style={[styles.menuContainer, menuContainerStyle]}
          >
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={navigateToSettings}
            >
              <Feather name="settings" size={20} color="black" />
              <Text style={styles.menuText}>Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={navigateToSaved}
            >
              <Feather name="bookmark" size={20} color="black" />
              <Text style={styles.menuText}>Saved</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={navigateToArchived}
            >
              <Feather name="archive" size={20} color="black" />
              <Text style={styles.menuText}>Archived</Text>
            </TouchableOpacity>
            
            <View style={styles.menuDivider} />
            
            <TouchableOpacity 
              style={styles.menuItem} 
              onPress={handleLogout}
            >
              <Feather name="log-out" size={20} color="#FF3B30" />
              <Text style={[styles.menuText, styles.logoutText]}>Log Out</Text>
            </TouchableOpacity>
          </Animated.View>
        </TouchableOpacity>
      </Modal>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header with username and settings */}
        <View style={styles.header}>
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="plus-square" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={toggleMenu}>
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
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]}
            onPress={() => setActiveTab('posts')}
          >
            <Feather 
              name="grid" 
              size={24} 
              color={activeTab === 'posts' ? "black" : "gray"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'reels' && styles.activeTab]}
            onPress={() => setActiveTab('reels')}
          >
            <Feather 
              name="film" 
              size={24} 
              color={activeTab === 'reels' ? "black" : "gray"} 
            />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tagged' && styles.activeTab]}
            onPress={() => setActiveTab('tagged')}
          >
            <Feather 
              name="user" 
              size={24} 
              color={activeTab === 'tagged' ? "black" : "gray"} 
            />
          </TouchableOpacity>
        </View>

        {/* Content based on selected tab */}
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
  reelContainer: {
    width: '33.33%',
    position: 'relative',
    padding: 1,
  },
  reelOverlay: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reelViewCount: {
    color: 'white',
    fontSize: 12,
    marginLeft: 4,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.7)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
  // Menu styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    backgroundColor: 'white',
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuText: {
    marginLeft: 15,
    fontSize: 16,
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#DBDBDB',
    marginVertical: 10,
  },
  logoutText: {
    color: '#FF3B30',
  },
});