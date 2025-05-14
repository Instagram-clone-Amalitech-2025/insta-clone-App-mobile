import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UploadScreen() {
  return (
    <View style={styles.container}>
      <Text>Upload Feed</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
// This is a simple UploadScreen component for a React Native application.    
// It uses the View and Text components from React Native to create a basic layout.
// The UploadScreen component is a functional component that returns a View containing a Text element.