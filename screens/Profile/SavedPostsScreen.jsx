import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const SavedPostsScreen = ({ navigation }) => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [activeCollection, setActiveCollection] = useState(null);

  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';

  const windowWidth = Dimensions.get('window').width;
  const numColumns = 3;
  const itemWidth = (windowWidth - 4) / numColumns;

  const goBack = () => navigation.goBack();

  useEffect(() => {
    fetchSavedData();
  }, []);

  const fetchSavedData = () => {
    setLoading(true);
    setTimeout(() => {
      setSavedPosts([]); // no mock posts
      setCollections([]); // no mock collections
      setActiveCollection(null);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchSavedData();
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === 'grid' ? 'collection' : 'grid');
    if (viewMode === 'grid') {
      setActiveCollection(null);
    }
  };

  const renderHeader = () => (
    <View style={[styles.header, isDark && styles.darkHeader]}>
      <TouchableOpacity onPress={goBack}>
        <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
      </TouchableOpacity>
      <Text style={[styles.headerTitle, isDark && styles.darkText]}>Saved</Text>
      <View style={styles.headerButtons}>
        <TouchableOpacity style={styles.headerButton} onPress={toggleViewMode}>
          <Feather name={viewMode === 'grid' ? 'folder' : 'grid'} size={24} color={isDark ? "#FFFFFF" :"#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.headerButton}>
          <Feather name="plus-circle" size={24} color={isDark ? "#FFFFFF" :"#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render the saved posts in grid or collection view
  const renderEmptyState = () => (
    <View style={[styles.emptyContainer, isDark && styles.darkContainer]}>
      <Feather name="bookmark" size={64} color={isDark ? "#555555" : "#cccccc"} />
      <Text style={[styles.emptyText, isDark && styles.darkText]}>Nothing saved yet</Text>
      <Text style={[styles.emptySubtext, isDark && styles.darkMutedText]}>All the posts and items you've saved will show up here.</Text>
    </View>
  );

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      {renderHeader()}
      {loading && !refreshing ? (
        <View style={[styles.loadingContainer, isDark && styles.darkContainer]}>
          <ActivityIndicator size="large" color={isDark ? "#FFFFFF" : "#000"} />
        </View>
      ) : (
        renderEmptyState()
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', marginTop: 50 },
  darkContainer: { backgroundColor: '#000' },
  darkText: { color: '#FFFFFF' },
  darkMutedText: { color: '#AAAAAA' },
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
  headerButtons: { flexDirection: 'row', alignItems: 'center' },
  headerButton: { marginLeft: 20 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: '#fff' },
  emptyText: { fontSize: 18, color: '#555', marginTop: 12, fontWeight: '600' },
  emptySubtext: { fontSize: 14, color: '#888', marginTop: 4, textAlign: 'center' },
});

export default SavedPostsScreen;
