import { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons'; // Added Feather
import { useSelector } from 'react-redux'; // Added useSelector

const ArchivedPostsScreen = ({ navigation }) => {
  const [archivedPosts, setArchivedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';

  useEffect(() => {
    // Simulate fetching archived posts from API
    fetchArchivedPosts();
  }, []);

  const fetchArchivedPosts = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setArchivedPosts([]); // Simulate no archived posts
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchArchivedPosts();
  };

  const goBack = () => navigation.goBack();

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

  const handlePostPress = (item) => {
    // Navigate to post detail screen, passing the item and type
    navigation.navigate('PostDetail', { item, type: 'archived' });
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
    <View style={[styles.container, isDark && styles.darkContainer]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <TouchableOpacity onPress={goBack}>
          <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.darkText]}>Archived</Text>
        {/* Added Plus Button */}
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton}>
            <Feather name="plus-circle" size={24} color={isDark ? "#FFFFFF" : "#000"} />
          </TouchableOpacity>
        </View>
      </View>

      {loading && !refreshing ? (
        <View style={[styles.loadingContainer, isDark && styles.darkContainer]}>
          <ActivityIndicator size="large" color={isDark ? "#FFFFFF" : "#4a86f7"} />
        </View>
      ) : archivedPosts.length > 0 ? (
        <FlatList
          data={archivedPosts}
          renderItem={renderPostItem}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.listContainer, isDark && styles.darkListContainer]}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        // Updated empty state to match SavedPostsScreen
        <View style={[styles.emptyContainer, isDark && styles.darkContainer]}>
          <Feather name="bookmark" size={64} color={isDark ? "#555555" : "#cccccc"} />
          <Text style={[
            styles.emptyText,
            isDark && styles.darkText
          ]}>No story items saved</Text>
          <Text style={[
            styles.emptySubtext,
            isDark && styles.darkMutedText
          ]}>Anything you save will appear here
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
    marginTop: 30,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
    backgroundColor: '#fff',
  },
  darkHeader: {
    backgroundColor: '#121212',
    borderBottomColor: '#333333',
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#000' },
  headerButtons: { flexDirection: 'row', alignItems: 'center' }, // Added
  headerButton: { marginLeft: 20 }, // Added
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Ensure loading container matches light theme
  },
  listContainer: {
    paddingVertical: 12,
  },
  darkListContainer: {
    // Potentially add dark mode specific styles for the list if needed, e.g., different separator color
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
  // Add darkPostItem style if needed for dark mode
  // darkPostItem: { backgroundColor: '#121212', borderColor: '#333333' },
  postContent: {
    flex: 1,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333', // Default light mode text
    // For dark mode: color: isDark ? '#FFFFFF' : '#333333',
    marginBottom: 4,
  },
  postDate: {
    fontSize: 12,
    color: '#888888',
    marginBottom: 6,
  },
  // For dark mode: color: isDark ? '#AAAAAA' : '#888888',
  postPreview: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  // For dark mode: color: isDark ? '#CCCCCC' : '#666666',
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
    color: '#555', // Matched SavedPostsScreen
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