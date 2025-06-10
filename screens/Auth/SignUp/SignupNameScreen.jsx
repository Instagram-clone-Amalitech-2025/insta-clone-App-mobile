import React, { useState } from 'react';
import { Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import AuthTextInput from '../../../components/Auth/AuthTextInput';
import Button from '../../../components/Common/Button';
import { Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';

export default function SignupNameScreen({ route, navigation }) {
  const { identifier } = route.params;
  const [fullName, setFullName] = useState('');
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const handleNext = () => {
    if (!fullName.trim()) {
      alert('Please enter your full name.');
      return;
    }
    navigation.navigate('SignupAvatar', { identifier, fullName });
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
        <Text style={[styles.title, isDark && styles.darkText]}>What's Your Name?</Text>
        <Text style={[styles.subtitle, isDark && styles.darkMutedText]}>
          Add your full name so friends can find you.
        </Text>
        <AuthTextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={[styles.input, isDark && styles.darkInput]}
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
    fontSize: 14,
  },
  darkInput: {
    backgroundColor: '#1e1e1e',
    borderColor: '#555',
    color: '#fff',
  },
  button: {
    backgroundColor: '#0095f6',
    borderRadius: 5,
    padding: 14,
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
