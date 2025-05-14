import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

export default function AuthTextInput({ placeholder, secureTextEntry, value, onChangeText }) {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      value={value}
      onChangeText={onChangeText}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    width: '100%',
    backgroundColor: '#fff',
  },
});
// This is a simple AuthTextInput component for a React Native application.