import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import AuthTextInput from '../../components/Auth/AuthTextInput';
import Button from '../../components/Common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';

export default function SignupScreen({ navigation }) {
  const [mobileNumber, setMobileNumber] = useState('');

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  // Determine if the Next button should be disabled
  const isNextDisabled = !mobileNumber.trim();

  const handleNext = () => {
    if (!mobileNumber.trim()) {
      alert('Please enter your mobile number.');
      return;
    }
    navigation.navigate('SignupName', { identifier: mobileNumber });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidContent}
      >
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.backButton}>
            <Feather name="arrow-left" size={24} color={isDark ? "#FFFFFF" : "black"} />
        </TouchableOpacity>

        <Text style={[styles.title, isDark && styles.darkText]}>What's your mobile number?</Text>
        <Text style={[styles.subtitle, isDark && styles.darkMutedText]}>
          Enter the mobile number you can be reached on. You can also add an email later.
        </Text>
        <AuthTextInput
          containerStyle={styles.inputContainer}
          placeholder="Mobile Number"
          value={mobileNumber}
          onChangeText={setMobileNumber}
          style={[styles.input, isDark && styles.darkInput]}
          keyboardType="phone-pad"
        />
        <Button
          containerStyle={styles.buttonContainer}
          title="Next"
          onPress={handleNext}
          style={[styles.button, isDark && styles.darkButton]}
          textStyle={[styles.buttonText, isDark && styles.darkButtonText]}
          disabled={isNextDisabled}
        />
        <TouchableOpacity
            style={[styles.outlineButton, isDark && styles.darkOutlineButton]}
            onPress={() => navigation.navigate('SignupEmail')}
        >
            <Text style={[styles.outlineButtonText, isDark && styles.darkOutlineButtonText]}>Sign up with email instead</Text>
        </TouchableOpacity>


        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, isDark && styles.darkText]}>
            Have an account?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Log in
            </Text>
          </Text>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 20,
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  keyboardAvoidContent: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 80,
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
  welcomeText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#8e8e8e',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 280,
  },

  orSeparatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dbdbdb',
  },
  separatorText: {
    color: '#8e8e8e',
    fontWeight: '600',
    fontSize: 12,
    paddingHorizontal: 10,
  },
  
  inputContainer: {
    width: '100%',
    maxWidth: 350,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 5,
    padding: 12,
    marginVertical: 10,
    fontSize: 16,
    width: '100%',
  },
  darkInput: {
    backgroundColor: '#333',
    borderColor: '#555',
    color: '#fff',
  },
  policyText: {
    fontSize: 12,
    color: '#8e8e8e',
    textAlign: 'center',
    marginVertical: 15,
  },

  buttonContainer: {
    width: '100%',
    maxWidth: 350,
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
    fontWeight: '600',
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
    fontWeight: '600',
    fontSize: 14,
  },
  darkOutlineButtonText: {
    color: '#007bff',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    paddingTop: 20,
  },
  loginText: {
    color: '#262626',
    fontSize: 14,
  },
  link: {
    color: '#0095f6',
    fontWeight: '600',
  },
  themeToggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  toggleLabel: {
    marginRight: 10,
    fontSize: 12,
    color: '#8e8e8e',
  },
});