import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const ArchivedPostsScreen = ({ navigation }) => {
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for archived posts
  const mockArchivedPosts = [
    { id: '1', title: 'My travel adventure', date: '2025-05-01', preview: 'Exploring the beautiful landscapes...' },
    { id: '2', title: 'Tech conference highlights', date: '2025-04-15', preview: 'The latest innovations in AI...' },
    { id: '3', title: 'Weekend cooking recipe', date: '2025-04-02', preview: 'A delicious pasta dish that...' },
    { id: '4', title: 'Book review', date: '2025-03-20', preview: 'An insightful analysis of...' },
    { id: '5', title: 'Fitness journey update', date: '2025-03-10', preview: 'After three months of consistent...' },
  ];

  useEffect(() => {
    // Simulate fetching archived posts from API
    fetchArchivedPosts();
  }, []);

  const fetchArchivedPosts = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setArchivedPosts(mockArchivedPosts);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchArchivedPosts();
  };

  const handleUnarchive = (postId) => {
    // Show a brief loading state
    setLoading(true);
    
    // Simulate unarchiving process
    setTimeout(() => {
      const updatedPosts = archivedPosts.filter(post => post.id !== postId);
      setArchivedPosts(updatedPosts);
      setLoading(false);
    }, 500);
  };

  const handlePostPress = (postId) => {
    // Navigate to post detail screen
    navigation.navigate('PostDetail', { postId });
  };

  const renderPostItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.postItem}
      onPress={() => handlePostPress(item.id)}
    >
      <View style={styles.postContent}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postDate}>Archived on {item.date}</Text>
        <Text style={styles.postPreview} numberOfLines={2}>{item.preview}</Text>
      </View>
      <TouchableOpacity 
        style={styles.unarchiveButton}
        onPress={() => handleUnarchive(item.id)}
      >
        <MaterialIcons name="unarchive" size={24} color="#4a86f7" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a86f7" />
        </View>
      ) : archivedPosts.length > 0 ? (
        <FlatList
          data={archivedPosts}
          renderItem={renderPostItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="archive" size={64} color="#cccccc" />
          <Text style={styles.emptyText}>No archived posts yet</Text>
          <Text style={styles.emptySubtext}>
            When you archive posts, they'll appear here
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingVertical: 12,
  },
  postItem: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 14,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 6,
  },
  postPreview: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  unarchiveButton: {
    justifyContent: 'center',
    paddingLeft: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888888',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default ArchivedPostsScreen;