import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';

const PostGrid = ({ posts, onPostPress }) => {
  return (
    <View style={styles.gridContainer}>
      {posts.map((post, index) => (
        <TouchableOpacity key={index} onPress={() => onPostPress(post)}>
          <Image source={{ uri: post.imageUrl }} style={styles.gridItem} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '33.33%',
    height: 100,
    borderWidth: 1,
    borderColor: 'white',
  },
});

export default PostGrid;
