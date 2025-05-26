import React from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';

const Button = ({ title, onPress, containerStyle, style, textStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: '#0095f6',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default Button;
