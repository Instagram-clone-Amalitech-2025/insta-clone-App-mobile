import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../../redux/slices/postSlice'; 
import { fetchPosts } from '../../redux/slices/postSlice';

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);
  const appTheme = useSelector((state) => state.theme.theme); // Get theme state
  const isDark = appTheme === 'dark';

  const [likedStatuses, setLikedStatuses] = useState({}); // postId: boolean
  const [dynamicLikeCounts, setDynamicLikeCounts] = useState({}); // postId: number
  const [bookmarkedStatuses, setBookmarkedStatuses] = useState({}); // postId: boolean
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadPosts = async () => {
  try {
    await dispatch(fetchPosts()); // Axios fetch
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
};
  useEffect(() => {
    loadPosts();
  }, [dispatch]);
  
  const handleLike = (postId) => {
    const currentlyLiked = likedStatuses[postId];
    setLikedStatuses(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));

    setDynamicLikeCounts(prevCounts => {
      const currentCount = prevCounts[postId] !== undefined ? prevCounts[postId] : mockPosts.find(p => p.id === postId)?.likes || 0;
      return {
        ...prevCounts,
        [postId]: currentlyLiked ? currentCount - 1 : currentCount + 1,
      };
    });
  };

  const handleBookmark = (postId) => {
    setBookmarkedStatuses(prev => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const onRefresh = React.useCallback(() => {
    setIsRefreshing(true);
    dispatch(fetchPosts()).then(() => {
      setLikedStatuses({});
      setBookmarkedStatuses({});
      setIsRefreshing(false);
    });
  }, [dispatch]);

  const loading = useSelector((state) => state.posts.loading);

if (loading) {
  return (
    <View style={styles.loadingContainer}>
      <Text style={{ color: isDark ? '#fff' : '#000' }}>Loading posts...</Text>
    </View>
  );
}



  const renderPost = (post) => (
    // Ensure dark mode styles are applied to post container if needed
    <View key={post.id} style={[styles.post, isDark && styles.darkPost]}> 
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Image source={{ uri: post.userAvatar }} style={styles.avatarPlaceholder} />
          </View>
          <View>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={[styles.location, isDark && styles.darkMutedText]}>{post.location}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={[styles.moreOptions, isDark && styles.darkText]}>•••</Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />

      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleLike(post.id)}>
            {likedStatuses[post.id] ? (
              <Ionicons name="heart" size={24} color="red" />
            ) : (
              <Feather name="heart" size={24} color={isDark ? "#FFFFFF" : "#000000"} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={24} color={isDark ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="send" size={24} color={isDark ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => handleBookmark(post.id)}>
          {bookmarkedStatuses[post.id] ? (
            <Ionicons name="bookmark" size={24} color={isDark ? "#FFFFFF" : "#000000"} />
          ) : (
            <Feather name="bookmark" size={24} color={isDark ? "#FFFFFF" : "#000000"} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.postDetails}>
        <Text style={[styles.likes, isDark && styles.darkText]}>
          {dynamicLikeCounts[post.id] !== undefined ? dynamicLikeCounts[post.id] : post.likes} likes
        </Text>
        <Text style={[styles.caption, isDark && styles.darkText]}>
          <Text style={[styles.username, isDark && styles.darkText]}>{post.username}</Text> {post.caption}
        </Text>
        <TouchableOpacity>
          <Text style={[styles.comments, isDark && styles.darkMutedText]}>View all {post.comments} comments</Text>
        </TouchableOpacity>
        <Text style={[styles.timeAgo, isDark && styles.darkMutedText]}>{post.timeAgo}</Text>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <Text style={[styles.headerLogo, isDark && styles.darkText]}>Instagram</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Notifications')}>
            <Feather name="heart" size={24} color={isDark ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="send" size={24} color={isDark ? "#FFFFFF" : "#000000"} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories Section */}
      <ScrollView 
        style={styles.feed} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={isDark ? ['#FFFFFF'] : ['#000000']} // Spinner color
            tintColor={isDark ? '#FFFFFF' : '#000000'} // iOS spinner color
          />
        }
      >
        <View style={styles.storiesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.storyItem}>
              <TouchableOpacity onPress={() => navigation.navigate('UploadStory')}>
                <View style={styles.storyPlus}>
                  <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.storyAvatar} />
                  <View style={styles.addStoryButton}>
                    <Feather name="plus" size={12} color="#FFFFFF" />
                  </View>
                </View>
              </TouchableOpacity>
              <Text style={[styles.storyUsername, isDark && styles.darkText]}>Your Story</Text>
            </View>

            {['user1', 'travel_enthusiast', 'foodie', 'photographer', 'fitness_guru'].map((user, index) => (
              <View key={index} style={styles.storyItem}>
                <View style={styles.storyRing}>
                  <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.storyAvatar} />
                </View>
                <Text style={[styles.storyUsername, isDark && styles.darkText]}>
                  {user.length > 9 ? user.substring(0, 9) + '...' : user}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
        {(posts || []).map(post => renderPost(post))}

        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 50,
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
    backgroundColor: '#FFFFFF',
  },
  darkHeader: {
    backgroundColor: '#121212',
    borderBottomColor: '#333333',
  },
  headerLogo: {
    fontWeight: 'bold',
    fontSize: 24,
    fontFamily: 'serif',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 20,
  },
  storiesContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    marginBottom: 10,
  },
  darkStoriesContainer: {
    borderBottomColor: '#333333',
  },
  storyItem: {
    alignItems: 'center',
    marginRight: 15,
    width: 68,
  },
  storyAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#DBDBDB',
  },
  storyRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: '#E1306C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyPlus: {
    position: 'relative',
  },
  addStoryButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#3897F0',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  storyUsername: {
    fontSize: 12,
    marginTop: 3,
  },
  feed: {
    flex: 1,
  },
  post: {
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
    backgroundColor: '#FFF',
  },
  darkPost: {
    backgroundColor: '#121212',
    borderBottomColor: '#333333',
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    marginRight: 10,
  },
  avatarPlaceholder: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#DBDBDB',
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  location: {
    fontSize: 12,
    color: '#666',
  },
  moreOptions: {
    fontSize: 16,
  },
  postImage: {
    width: '100%',
    height: 300,
    backgroundColor: '#DBDBDB',
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  postDetails: {
    paddingHorizontal: 10,
  },
  likes: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  caption: {
    marginBottom: 5,
  },
  comments: {
    color: '#666',
    marginBottom: 5,
  },
  timeAgo: {
    color: '#666',
    fontSize: 12,
    marginTop: 3,
  },
});
