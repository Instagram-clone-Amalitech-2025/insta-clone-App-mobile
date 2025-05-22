import React, { useState } from 'react';
import { View, Text,  StyleSheet, TextInput, TouchableOpacity, ScrollView, Image, FlatList, SafeAreaView} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock data for trending searches
  const trendingSearches = ['travel', 'food', 'fashion', 'pets', 'nature'];
  
  // Mock data for grid content
  const gridItems = Array.from({ length: 15 }, (_, index) => ({
    id: index.toString(),
    image: `/api/placeholder/150/150`
  }));

  const renderGridItem = ({ item, index }) => (
    <TouchableOpacity style={styles.gridItem}>
      <Image 
        source={{ uri: item.image }} 
        style={styles.gridImage} 
      />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}> 
      <StatusBar style="dark" />
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#8e8e8e" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#8e8e8e"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={16} color="#c7c7c7" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {searchQuery.length > 0 ? (
        // Search results
        <ScrollView style={styles.searchResults}>
          {trendingSearches
            .filter(item => item.includes(searchQuery.toLowerCase()))
            .map((item, index) => (
              <TouchableOpacity key={index} style={styles.searchResultItem}>
                <Ionicons name="search-outline" size={16} color="#8e8e8e" />
                <Text style={styles.searchResultText}>{item}</Text>
              </TouchableOpacity>
            ))}
        </ScrollView>
      ) : (
        // Explore grid when not searching
        <View style={styles.exploreContainer}>
          <FlatList
            data={gridItems}
            renderItem={renderGridItem}
            keyExtractor={item => item.id}
            numColumns={3}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 30,
  },
  searchContainer: {
    paddingHorizontal: 15,
    paddingVertical: 30,
    marginTop: 1,
    borderBottomWidth: 0.5,
    borderBottomColor: '#dbdbdb',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebebeb',
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 36,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#262626',
    height: '100%',
  },
  searchResults: {
    flex: 1,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ebebeb',
  },
  searchResultText: {
    marginLeft: 10,
    fontSize: 14,
    color: '#262626',
  },
  exploreContainer: {
    flex: 1,
    paddingTop: 2,
  },
  gridItem: {
    flex: 1/3,
    aspectRatio: 1,
    padding: 1,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#efefef',
  }
});