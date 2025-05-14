import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SavedPostsScreen = ({ navigation }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  // Mock categories for saved posts
  const categories = ['All', 'Articles', 'Videos', 'Images', 'Links'];

  // Mock data for saved posts
  const mockSavedPosts = [
    { 
      id: '1', 
      title: 'Ultimate Guide to React Native', 
      date: '2025-05-10', 
      author: 'John Developer', 
      category: 'Articles',
      thumbnail: null, // Will use a placeholder
    },
    { 
      id: '2', 
      title: 'Building Cross-Platform Mobile Apps', 
      date: '2025-05-08', 
      author: 'Sarah Tech', 
      category: 'Videos',
      thumbnail: null,
    },
    { 
      id: '3', 
      title: 'UI Design Principles for Mobile', 
      date: '2025-05-05', 
      author: 'Design Master', 
      category: 'Articles',
      thumbnail: null,
    },
    { 
      id: '4', 
      title: 'Spring Collection Photography', 
      date: '2025-04-28', 
      author: 'Visual Artist', 
      category: 'Images',
      thumbnail: null,
    },
    { 
      id: '5', 
      title: 'Useful Development Resources', 
      date: '2025-04-22', 
      author: 'Resource Hub', 
      category: 'Links',
      thumbnail: null,
    },
  ];

  useEffect(() => {
    // Simulate fetching saved posts from API
    fetchSavedPosts();
  }, []);

  const fetchSavedPosts = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setSavedPosts(mockSavedPosts);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSavedPosts();
  };

  const handleRemoveSaved = (postId) => {
    // Show a brief loading state
    setLoading(true);
    
    // Simulate removing from saved process
    setTimeout(() => {
      const updatedPosts = savedPosts.filter(post => post.id !== postId);
      setSavedPosts(updatedPosts);
      setLoading(false);
    }, 500);
  };

  const handlePostPress = (postId) => {
    // Navigate to post detail screen
    navigation.navigate('PostDetail', { postId });
  };

  const filterPostsByCategory = () => {
    if (activeCategory === 'All') {
      return savedPosts;
    }
    return savedPosts.filter(post => post.category === activeCategory);
  };

  const renderCategoryItem = (category) => (
    <TouchableOpacity
      key={category}
      style={[
        styles.categoryTab,
        activeCategory === category && styles.activeCategoryTab
      ]}
      onPress={() => setActiveCategory(category)}
    >
      <Text 
        style={[
          styles.categoryText,
          activeCategory === category && styles.activeCategoryText
        ]}
      >
        {category}
      </Text>
    </TouchableOpacity>
  );

  const renderPostItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.postItem}
      onPress={() => handlePostPress(item.id)}
    >
      {item.thumbnail ? (
        <Image 
          source={{ uri: item.thumbnail }} 
          style={styles.thumbnail} 
        />
      ) : (
        <View style={[styles.thumbnail, styles.placeholderThumbnail]}>
          <MaterialIcons 
            name={
              item.category === 'Articles' ? 'article' : 
              item.category === 'Videos' ? 'videocam' :
              item.category === 'Images' ? 'image' : 'link'
            } 
            size={24} 
            color="#aaaaaa" 
          />
        </View>
      )}
      
      <View style={styles.postContent}>
        <Text style={styles.postTitle} numberOfLines={2}>{item.title}</Text>
        <Text style={styles.postInfo}>{item.author} • {item.date}</Text>
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.saveButton}
        onPress={() => handleRemoveSaved(item.id)}
      >
        <MaterialIcons name="bookmark" size={24} color="#4a86f7" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const filteredPosts = filterPostsByCategory();

  return (
    <View style={styles.container}>
      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={({ item }) => renderCategoryItem(item)}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#4a86f7" />
        </View>
      ) : filteredPosts.length > 0 ? (
        <FlatList
          data={filteredPosts}
          renderItem={renderPostItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="bookmark-outline" size={64} color="#cccccc" />
          <Text style={styles.emptyText}>No saved posts</Text>
          <Text style={styles.emptySubtext}>
            Posts you save will appear here for easy access
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
  categoriesContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  categoriesList: {
    paddingHorizontal: 12,
  },
  categoryTab: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginRight: 4,
  },
  activeCategoryTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#4a86f7',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#888888',
  },
  activeCategoryText: {
    color: '#4a86f7',
    fontWeight: '600',
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
    padding: 12,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  placeholderThumbnail: {
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  postContent: {
    flex: 1,
    justifyContent: 'space-between',
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
    lineHeight: 20,
  },
  postInfo: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 6,
  },
  categoryBadge: {
    backgroundColor: '#f0f5ff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  categoryBadgeText: {
    fontSize: 11,
    color: '#4a86f7',
    fontWeight: '500',
  },
  saveButton: {
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

export default SavedPostsScreen;