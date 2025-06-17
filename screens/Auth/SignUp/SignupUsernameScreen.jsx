import React, { useState } from 'react';
import {Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import AuthTextInput from '../../../components/Auth/AuthTextInput';
import Button from '../../../components/Common/Button';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function SignupUsernameScreen({ route, navigation }) {
  const { identifier, full_name } = route.params;
  const [username, setUsername] = useState('');
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const handleNext = () => {
    if (!username.trim()) {
      alert('Please choose a username.');
      return;
    }
    if (username.includes(' ') || username.length < 3) {
        alert('Username must be at least 3 characters and cannot contain spaces.');
        return;
    }
    navigation.navigate('SignupPassword', { identifier, full_name, username });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
        </TouchableOpacity>
        <Text style={[styles.title, isDark && styles.darkText]}>Create a Username</Text>
        <Text style={[styles.subtitle, isDark && styles.darkMutedText]}>
          Pick a username for your new account. You can always change it later.
        </Text>
        <AuthTextInput
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          style={[styles.input, isDark && styles.darkInput]}
          autoCapitalize="none"
        />
        <Button
          title="Next"
          onPress={handleNext}
          style={[styles.button, isDark && styles.darkButton]}
          textStyle={[styles.buttonText, isDark && styles.darkButtonText]}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 80,
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 40 : 20,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#1e1e1e',
    borderColor: '#555',
    color: '#fff',
  },
  button: {
    backgroundColor: '#0095f6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  darkButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  darkButtonText: {
    color: '#fff',
  },
  darkText: {
    color: '#fff',
  },
  darkMutedText: {
    color: '#aaa',
  },
});
