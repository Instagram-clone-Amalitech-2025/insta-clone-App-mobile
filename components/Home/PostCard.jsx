import React, { memo } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PostCard = memo(({ post }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Image source={{ uri: post.user.profileImage }} style={styles.profileImage} />
        <Text style={styles.username}>{post.user.username}</Text>
      </View>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="chatbubble-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.likes}>
        <Text style={styles.likesCount}>{post.likes} likes</Text>
      </View>
      <View style={styles.caption}>
        <Text style={styles.username}>{post.user.username}</Text>
        <Text>{post.caption}</Text>
      </View>
      <TouchableOpacity style={styles.comments}>
        <Text style={styles.viewComments}>View all {post.comments.length} comments</Text>
      </TouchableOpacity>
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
  },
  postImage: {
    width: '100%',
    height: 400,
  },
  actions: {
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
  likes: {
    paddingHorizontal: 10,
  },
  likesCount: {
    fontWeight: 'bold',
  },
  caption: {
    flexDirection: 'row',
    padding: 10,
  },
  comments: {
    padding: 10,
  },
  viewComments: {
    color: 'gray',
  }
});