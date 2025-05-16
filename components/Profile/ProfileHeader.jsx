import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const ProfileHeader = ({ profile }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: profile.profile_picture }} style={styles.profileImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{profile.username}</Text>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 16,
    color: 'gray',
  },
  bio: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default ProfileHeader;
