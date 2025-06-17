import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView, FlatList, Platform, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hook'; // Typed hooks (create in your app)
import { fetchUserProfile } from '../../redux/slices/userSlice';

export default function ProfileScreen({ navigation }) {
  const dispatch = useAppDispatch();
  const { user, loading, error } = useAppSelector(state => state.user);

  const [activeTab, setActiveTab] = useState('posts');

  console.log({ user, loading, error });

  useEffect(() => {
    dispatch(fetchUserProfile())
      .unwrap()
      .then(user => console.log('Fetched user:', user))
      .catch(err => console.error('Error fetching user:', err));
  }, [dispatch]);

  const handleEditProfile = () => {
    navigation.navigate('EditProfile', { user });
  };

  const postsData = Array.from({ length: 9 }, (_, i) => ({
    id: `post-${i}`,
    imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=500&q=60',
  }));

  const taggedData = Array.from({ length: 5 }, (_, i) => ({
    id: `tagged-${i}`,
    imageUrl: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=500&q=60',
    taggedBy: `user_${Math.floor(Math.random() * 100)}`,
  }));

  const navigateToPostDetail = (item, type) => {
    navigation.navigate('PostDetail', { item, type });
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity style={styles.postItemContainer} onPress={() => navigateToPostDetail(item, 'post')}>
      <View style={styles.greyPlaceholder} />
    </TouchableOpacity>
  );

  const renderTaggedItem = ({ item }) => (
    <TouchableOpacity style={styles.taggedContainer} onPress={() => navigateToPostDetail(item, 'tagged')}>
      <View style={styles.greyPlaceholder} />
      <View style={styles.taggedIndicator}>
        <Feather name="user" size={12} color="white" />
      </View>
    </TouchableOpacity>
  );

  const renderTabContent = () => {
    const data = activeTab === 'posts' ? postsData : taggedData;
    const renderItem = activeTab === 'posts' ? renderPostItem : renderTaggedItem;

    return (
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={3}
        scrollEnabled={false}
        contentContainerStyle={styles.gridContainer}
        columnWrapperStyle={styles.row}
      />
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.message}>Loading user profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.message}>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.message}>User profile not available.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.username}>{user.username}</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => navigation.navigate('Create')}
            >
              <Feather name="plus-square" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.iconButton} 
              onPress={() => navigation.navigate('Settings')}
            >
              <Feather name="menu" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.profileSection}>
          <Image
            source={{ uri: user.profile_picture || 'https://via.placeholder.com/100' }}
            style={styles.avatar}
          />
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.post_count || 0}</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.followers_count || 0}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.following_count || 0}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
          </View>
        </View>

        <View style={styles.bioSection}>
          <Text style={styles.name}>{user.full_name}</Text>
          {user.bio && <Text style={styles.bio}>{user.bio}</Text>}
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.shareButton}>
            <Feather name="share" size={16} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          style={styles.highlightsScroll}
          contentContainerStyle={styles.highlightsContent}
        >
          <View style={styles.highlightItem}>
            <View style={styles.highlightCircle}>
              <Feather name="plus" size={24} color="#000" />
            </View>
            <Text style={styles.highlightText}>New</Text>
          </View>
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'posts' && styles.activeTab]} 
            onPress={() => setActiveTab('posts')}
          >
            <Feather name="grid" size={24} color={activeTab === 'posts' ? '#000' : '#8E8E93'} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'tagged' && styles.activeTab]} 
            onPress={() => setActiveTab('tagged')}
          >
            <Feather name="user" size={24} color={activeTab === 'tagged' ? '#000' : '#8E8E93'} />
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  message: {
    fontSize: 16,
    color: '#8E8E93',
    textAlign: 'center',
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
    color: '#000',
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 15,
    padding: 5,
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
    backgroundColor: '#F2F2F2',
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
    color: '#000',
  },
  statLabel: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: 2,
  },
  bioSection: {
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#000',
  },
  bio: {
    fontSize: 14,
    marginTop: 3,
    color: '#000',
    lineHeight: 18,
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
    color: '#000',
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
  highlightsScroll: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  highlightsContent: {
    paddingHorizontal: 15,
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 15,
  },
  highlightCircle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },
  highlightText: {
    fontSize: 12,
    marginTop: 5,
    color: '#000',
    textAlign: 'center',
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
    paddingVertical: 12,
    position: 'relative',
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tabContent: {
    width: '100%',
  },
  gridContainer: {
    paddingHorizontal: 0,
  },
  row: {
    justifyContent: 'space-between',
  },
  postItemContainer: {
    width: '33.33%',
    aspectRatio: 1,
    padding: 0.5,
  },
  greyPlaceholder: {
    flex: 1,
    backgroundColor: '#EFEFEF',
    borderRadius: 2,
  },
  taggedContainer: {
    width: '33.33%',
    aspectRatio: 1,
    position: 'relative',
    padding: 0.5,
  },
  taggedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});