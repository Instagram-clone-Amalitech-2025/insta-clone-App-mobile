import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

export default function PostDetailScreen({ route, navigation }) {
  // Get item data from navigation params
  const { item, type } = route.params;
  
  // State for likes (just for demo functionality)
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(Math.floor(Math.random() * 50) + 50);
  
  // Handle like action
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  // Format the title based on post type
  const formatTitle = () => {
    switch(type) {
      case 'post':
        return 'Post';
      case 'reel':
        return 'Reel';
      case 'tagged':
        return `Tagged by ${item.taggedBy}`;
      default:
        return 'Post';
    }
  };

  // Render additional info based on post type
  const renderTypeSpecificInfo = () => {
    switch(type) {
      case 'reel':
        return (
          <View style={styles.reelInfo}>
            <Feather name="play" size={14} color="#666" />
            <Text style={styles.reelViews}>{item.views} views</Text>
          </View>
        );
      case 'tagged':
        return (
          <View style={styles.taggedInfo}>
            <Feather name="user" size={14} color="#666" />
            <Text style={styles.taggedText}>Tagged by {item.taggedBy}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{formatTitle()}</Text>
        <TouchableOpacity>
          <Feather name="more-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* User info */}
        <View style={styles.userInfo}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=12' }} 
            style={styles.userAvatar} 
          />
          <View style={styles.userName}>
            <Text style={styles.userNameText}>User1</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        {/* Post image */}
        {/* Replaced Image with a grey View */}
        <View style={[styles.postImage, styles.greyPlaceholder]} />

        {/* Action buttons */}
        <View style={styles.actionBar}>
          <View style={styles.leftActions}>
            <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
              <Feather 
                name={isLiked ? "heart" : "heart"} 
                size={24} 
                color={isLiked ? "red" : "black"} 
                style={isLiked ? styles.filledHeart : {}}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="message-circle" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="send" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
            <Feather name={isSaved ? "bookmark" : "bookmark"} size={24} color={isSaved ? "black" : "black"} />
          </TouchableOpacity>
        </View>
        
        {/* Like count */}
        <View style={styles.likeSection}>
          <Text style={styles.likesText}>{likeCount} likes</Text>
        </View>

        {/* Caption */}
        <View style={styles.captionSection}>
          <Text style={styles.captionUsername}>User1</Text>
          <Text style={styles.captionText}>
            Beautiful day! #photography #instagram
          </Text>
        </View>

        {/* Type specific information */}
        {renderTypeSpecificInfo()}

        {/* Comments */}
        <TouchableOpacity style={styles.viewCommentsButton}>
          <Text style={styles.viewCommentsText}>View all comments</Text>
        </TouchableOpacity>

        {/* Time */}
        <Text style={styles.timeText}>Posted 2 hours ago</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: 30,
      paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
   header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  }, 
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  userName: {
    flex: 1,
    marginLeft: 10,
  },
  userNameText: {
    fontWeight: '600',
  },
  followButton: {
    backgroundColor: '#3897F0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  followButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 12,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  greyPlaceholder: { // Added for the main image placeholder
    backgroundColor: '#E0E0E0', // Or another shade of grey
    // Dimensions are handled by styles.postImage
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginRight: 15,
  },
  likeSection: {
    paddingHorizontal: 10,
    marginBottom: 5,
  },
  likesText: {
    fontWeight: '600',
  },
  captionSection: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    marginBottom: 5,
  },
  captionUsername: {
    fontWeight: '600',
    marginRight: 5,
  },
  captionText: {
    flex: 1,
  },
  viewCommentsButton: {
    paddingHorizontal: 10,
    marginTop: 5,
  },
  viewCommentsText: {
    color: '#999',
  },
  timeText: {
    paddingHorizontal: 10,
    fontSize: 10,
    color: '#999',
    marginTop: 5,
    marginBottom: 20,
  },
  reelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  reelViews: {
    marginLeft: 5,
    color: '#666',
  },
  taggedInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  taggedText: {
    marginLeft: 5,
    color: '#666',
  },
  filledHeart: {
    fill: 'red',
  },
});