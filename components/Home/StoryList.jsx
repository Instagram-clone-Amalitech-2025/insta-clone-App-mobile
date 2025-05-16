import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const StoryList = () => {
  const stories = [
    { id: '1', username: 'johndoe', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { id: '2', username: 'janedoe', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
    { id: '3', username: 'bobsmith', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
    { id: '4', username: 'alicesmith', image: 'https://randomuser.me/api/portraits/women/4.jpg' },
    { id: '5', username: 'charliebrown', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
    { id: '6', username: 'lucybrown', image: 'https://randomuser.me/api/portraits/women/6.jpg' },
    { id: '7', username: 'davidwilson', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
    { id: '8', username: 'emilywilson', image: 'https://randomuser.me/api/portraits/women/8.jpg' },
    { id: '9', username: 'franklin', image: 'https://randomuser.me/api/portraits/men/9.jpg' },
    { id: '10', username: 'patty', image: 'https://randomuser.me/api/portraits/women/10.jpg' },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.storyContainer}>
      <Image source={{ uri: item.image }} style={styles.storyImage} />
      <Text style={styles.storyUsername}>{item.username}</Text>
    </View>
  );

  return (
      <View style={styles.container}>
        <FlatList
          data={stories}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
  },
  storyContainer: {
    alignItems: 'center',
    marginRight: 15,
  },
  storyImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  storyUsername: {
    fontSize: 12,
    color: '#333',
  },
});

export default StoryList;
        