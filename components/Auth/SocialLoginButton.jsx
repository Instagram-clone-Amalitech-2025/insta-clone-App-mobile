import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SocialLoginButton = ({ platform, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.text}>Login with {platform}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#3b5998',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default SocialLoginButton;