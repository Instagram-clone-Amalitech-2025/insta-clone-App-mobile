import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setPosts } from '../../redux/slices/postSlice'; 

export default function HomeScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts.posts);

  // Temporary mock data
  const mockPosts = [
    {
      id: 1,
      username: 'user1',
      userAvatar: 'https://via.placeholder.com/150',
      location: 'New York',
      image: 'https://via.placeholder.com/400',
      likes: 125,
      caption: 'Enjoying a beautiful day in the city! #newyork #summer',
      comments: 23,
      timeAgo: '2h'
    },
    {
      id: 2,
      username: 'travel_enthusiast',
      userAvatar: 'https://via.placeholder.com/150',
      location: 'Bali, Indonesia',
      image: 'https://via.placeholder.com/400',
      likes: 432,
      caption: 'Paradise found 🌴 #bali #vacation',
      comments: 57,
      timeAgo: '4h'
    },
    {
      id: 3,
      username: 'foodie_adventures',
      userAvatar: 'https://via.placeholder.com/150',
      location: 'Cafe Delicious',
      image: 'https://via.placeholder.com/400',
      likes: 88,
      caption: 'Best brunch ever! #foodporn #weekend',
      comments: 12,
      timeAgo: '6h'
    }
  ];

  useEffect(() => {
    dispatch(setPosts(mockPosts)); // Load initial posts into Redux
  }, [dispatch]);

  const renderPost = (post) => (
    <View key={post.id} style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <View style={styles.userAvatar}>
            <Image source={{ uri: post.userAvatar }} style={styles.avatarPlaceholder} />
          </View>
          <View>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.location}>{post.location}</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Text style={styles.moreOptions}>•••</Text>
        </TouchableOpacity>
      </View>

      <Image source={{ uri: post.image }} style={styles.postImage} resizeMode="cover" />

      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="heart" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="send" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Feather name="bookmark" size={24} color="#000000" />
        </TouchableOpacity>
      </View>

      <View style={styles.postDetails}>
        <Text style={styles.likes}>{post.likes} likes</Text>
        <Text style={styles.caption}>
          <Text style={styles.username}>{post.username}</Text> {post.caption}
        </Text>
        <TouchableOpacity>
          <Text style={styles.comments}>View all {post.comments} comments</Text>
        </TouchableOpacity>
        <Text style={styles.timeAgo}>{post.timeAgo}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLogo}>Instagram</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton} onPress={() => navigation.navigate('Upload')}>
            <Feather name="plus-square" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="heart" size={24} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="message-circle" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Stories Section */}
      <ScrollView style={styles.feed} showsVerticalScrollIndicator={false}>
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
              <Text style={styles.storyUsername}>Your Story</Text>
            </View>

            {['user1', 'travel_enthusiast', 'foodie', 'photographer', 'fitness_guru'].map((user, index) => (
              <View key={index} style={styles.storyItem}>
                <View style={styles.storyRing}>
                  <Image source={{ uri: 'https://via.placeholder.com/150' }} style={styles.storyAvatar} />
                </View>
                <Text style={styles.storyUsername}>
                  {user.length > 9 ? user.substring(0, 9) + '...' : user}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {posts.map(post => renderPost(post))}
      </ScrollView>
    </View>
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
    paddingHorizontal: 10,
    marginTop: 8,
    height: 70,
    borderBottomWidth: 1,
    borderBottomColor: '#DBDBDB',
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
