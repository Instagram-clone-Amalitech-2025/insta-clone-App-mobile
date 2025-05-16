import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

const PostFeed = ({ post }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image source={{ uri: post.user.profile_picture }} style={styles.profileImage} />
          <Text style={styles.username}>{post.user.username}</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Feather name="more-horizontal" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: post.image }} style={styles.postImage} />

      <View style={styles.actions}>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="heart" size={24} color="black" style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="message-circle" size={24} color="black" style={styles.actionIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Feather name="send" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <Feather name="bookmark" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.likes}>
        <Text style={styles.likesCount}>{post.likes} likes</Text>
      </View>

      <View style={styles.caption}>
        <Text style={styles.username}>{post.user.username}</Text>
        <Text style={styles.captionText}>{post.caption}</Text>
      </View>

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.commentsLink}>View all {post.comments.length} comments</Text>
      </TouchableOpacity>

      {post.comments.slice(0, 2).map((comment, index) => (
        <View key={index} style={styles.comment}>
          <Text style={styles.commentUsername}>{comment.username}</Text>
          <Text style={styles.commentText}>{comment.text}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
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
    height: 300,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionIcon: {
    marginRight: 10,
  },
  likes: {
    paddingHorizontal: 10,
  },
  likesCount: {
    fontWeight: 'bold',
  },
  caption: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  captionText: {
    marginLeft: 5,
  },
  commentsLink: {
    paddingHorizontal: 10,
    marginTop: 5,
    color: 'gray',
  },
  comment: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    marginTop: 5,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {},
});

export default PostFeed;