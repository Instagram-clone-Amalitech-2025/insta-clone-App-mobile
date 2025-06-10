import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import AuthTextInput from '../../../components/Auth/AuthTextInput';
import Button from '../../../components/Common/Button';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function SignupEmailScreen({ navigation }) {
  const [emailInput, setEmailInput] = useState('');
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const handleNext = () => {
    if (!emailInput.trim()) {
      alert('Please enter your email address.');
      return;
    }
    navigation.navigate('SignupName', { identifier: emailInput });
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
        <Text style={[styles.title, isDark && styles.darkText]}>What's your email address?</Text>
        <Text style={[styles.subtitle, isDark && styles.darkMutedText]}>
          Enter the email address you can be reached on. You can also add a phone number later.
        </Text>
        <AuthTextInput
          placeholder="Email"
          value={emailInput}
          onChangeText={setEmailInput}
          style={[styles.input, isDark && styles.darkInput]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Button
          title="Next"
          onPress={handleNext}
          style={[styles.button, isDark && styles.darkButton]}
          textStyle={[styles.buttonText, isDark && styles.darkButtonText]}
        />
        <TouchableOpacity
            style={[styles.outlineButton, isDark && styles.darkOutlineButton]}
            onPress={() => navigation.navigate('Signup')}
        >
            <Text style={[styles.outlineButtonText, isDark && styles.darkOutlineButtonText]}>Sign up with phone number instead</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 20,
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
    padding: 12,
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
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
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#0095f6',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
    marginTop: 15,
    width: '100%',
    maxWidth: 350,
  },
  darkOutlineButton: {
    borderColor: '#007bff',
  },
  outlineButtonText: {
    color: '#0095f6',
    fontWeight: 'bold',
    fontSize: 14,
  },
  darkOutlineButtonText: {
    color: '#007bff',
  },
  darkText: {
    color: '#fff',
  },
  darkMutedText: {
    color: '#aaa',
  },
});
