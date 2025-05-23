import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

const NotificationsScreen = ({ navigation }) => {
  const [Notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const appTheme = useSelector((state) => state.theme.theme);
  const isDark = appTheme === 'dark';

    // Mock data for notifications
//   const mockNotifications = [
//     { id: '1', type: 'like', user: 'John Doe', userAvatar: 'https://i.pravatar.cc/150?img=1', postPreview: 'https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=100&q=60', message: 'liked your photo.', timestamp: '2h ago', postId: 'post1' },
//     { id: '2', type: 'comment', user: 'Jane Smith', userAvatar: 'https://i.pravatar.cc/150?img=2', message: 'commented: "Great shot!"', timestamp: '5h ago', postId: 'post2' },
//     { id: '3', type: 'follow', user: 'Alex Johnson', userAvatar: 'https://i.pravatar.cc/150?img=3', message: 'started following you.', timestamp: '1d ago', userId: 'user3' },
//     { id: '4', type: 'mention', user: 'Chris Lee', userAvatar: 'https://i.pravatar.cc/150?img=4', postPreview: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=100&q=60', message: 'mentioned you in a comment.', timestamp: '3d ago', postId: 'post4' },
//   ];

  useEffect(() => {
    // Simulate fetching archived posts from API
     fetchNotifications();
  }, []);

  const fetchNotifications = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
            // To test empty state, use: 
    setNotifications([]);
    //   setNotifications(mockNotifications);
      setLoading(false);
      setRefreshing(false);
    }, 1000);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const goBack = () => navigation.goBack();

   const handleDeleteNotification = (notificationId) => {
    // Show a brief loading state
    setLoading(true);
    setTimeout(() => {
         const updatedNotifications = Notifications.filter(notification => notification.id !== notificationId);
      setNotifications(updatedNotifications);
    }, 300);
  };

    const handleNotificationPress = (item) => {
    // Navigate based on notification type
    if (item.postId) {
      navigation.navigate('PostDetail', { item: { id: item.postId, imageUrl: item.postPreview || 'https://via.placeholder.com/400' }, type: item.type });
    } else if (item.userId) {
      // Assuming you have a Profile screen that can take a userId
      // navigation.navigate('Profile', { userId: item.userId });
      console.log('Navigate to profile of user:', item.userId);
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, isDark && styles.darkNotificationItem]}
      onPress={() => handleNotificationPress(item)}
    >
      {item.userAvatar && <Image source={{ uri: item.userAvatar }} style={styles.userAvatar} />}
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationText, isDark && styles.darkText]} numberOfLines={2}>
          <Text style={styles.userName}>{item.user}</Text> {item.message}
        </Text>
        <Text style={[styles.timestamp, isDark && styles.darkMutedText]}>{item.timestamp}</Text>
      </View>
      {item.postPreview && (
        <Image source={{ uri: item.postPreview }} style={styles.postPreviewImage} />
      )}
      <TouchableOpacity 
        style={styles.deleteButton} // Also, ensure this style name matches if it was intended to be 'deleteButton'
        onPress={() => handleDeleteNotification(item.id)}
      >
        <Feather name="x" size={20} color={isDark ? "#AAAAAA" : "#888888"} />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      {/* Header */}
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <TouchableOpacity onPress={goBack} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, isDark && styles.darkText]}>Notification</Text>
        {/* Placeholder for right side of header if needed for alignment */}
        <View style={{ width: 24 }} />
      </View>

      {loading && !refreshing ? (
        <View style={[styles.loadingContainer, isDark && styles.darkContainer]}>
          <ActivityIndicator size="large" color={isDark ? "#FFFFFF" : "#4a86f7"} />
        </View>
      ) : Notifications.length > 0 ? (
        <FlatList
          data={Notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          contentContainerStyle={[styles.listContainer, isDark && styles.darkListContainer]}
          refreshing={refreshing}
          onRefresh={handleRefresh}
        />
      ) : (
        <View style={[styles.emptyContainer, isDark && styles.darkContainer]}>
          <Feather name="heart" size={64} color={isDark ? "#555555" : "#cccccc"} />
          <Text style={[
            styles.emptyText,
            isDark && styles.darkText
          ]}>No notifications!</Text>
          <Text style={[
            styles.emptySubtext,
            isDark && styles.darkMutedText
          ]}>All notifications will appear here.
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
    backButton: { padding: 5 }, // Added for consistent spacing
  darkHeader: {
    backgroundColor: '#121212',
    borderBottomColor: '#333333',
  },
  headerTitle: { fontSize: 20, fontWeight: '600', color: '#000' },
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
  notificationItem: {
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

  darkNotificationItem: {
    backgroundColor: '#121212',
    // borderColor: '#333333', // If using borders
    shadowColor: '#000', // Shadow might not be very visible
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationText: {
    fontSize: 14,
    color: '#333333',
    lineHeight: 20,
  },
  userName: {
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333', // Default light mode text
    // For dark mode: color: isDark ? '#FFFFFF' : '#333333',
    marginBottom: 4,
  },
  postPreviewImage: {
    width: 40,
    height: 40,
    borderRadius: 4, // Optional: slight rounding for image
    marginLeft: 10,
  },
  deleteButton: {
    justifyContent: 'center',
    paddingLeft: 12,
    paddingRight: 4, // Give some space from the edge
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
    color: '#555',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#888888',
    marginTop: 8,
    textAlign: 'center',
  },
});

export default NotificationsScreen;