import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Avatar = ({ uri, size }) => {
  return (
    <Image
      source={{ uri }}
      style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}
    />
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Avatar;