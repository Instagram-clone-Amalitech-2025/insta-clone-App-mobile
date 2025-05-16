import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const FollowButton = ({ isFollowing, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: isFollowing ? 'white' : '#3493D9' },
      ]}
      onPress={onPress}
    >
      <Text style={[styles.buttonText, { color: isFollowing ? 'black' : 'white' }]}>
        {isFollowing ? 'Following' : 'Follow'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#DEDEDE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default FollowButton;
