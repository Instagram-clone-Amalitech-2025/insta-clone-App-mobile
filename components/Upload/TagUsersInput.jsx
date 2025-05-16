import React, { useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const TagUsersInput = ({ onTag }) => {
  const [username, setUsername] = useState('');

  const handleTag = () => {
    if (username.trim() !== '') {
      onTag(username);
      setUsername('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Tag a user..."
        value={username}
        onChangeText={setUsername}
        onSubmitEditing={handleTag}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default TagUsersInput;
