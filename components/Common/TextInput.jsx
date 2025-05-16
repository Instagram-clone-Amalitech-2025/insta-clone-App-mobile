import React from 'react';
import { TextInput as RNTextInput, StyleSheet, View } from 'react-native';

const TextInput = ({ placeholder, secureTextEntry, onChangeText, value, style }) => {
  return (
    <View style={styles.container}>
      <RNTextInput
        style={[styles.input, style]}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});

export default TextInput;