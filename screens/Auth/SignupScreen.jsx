import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import AuthTextInput from '../../components/AuthTextInput';
import Button from '../../components/Button';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  const handleSignup = () => {
    signup({ email, fullName, username, password });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, isDark && styles.darkText]}>Instagram</Text>
        </View>

        <Text style={[styles.welcomeText, isDark && styles.darkText]}>
          Sign up to see photos and videos from your friends.
        </Text>

        <TouchableOpacity style={styles.facebookButton}>
          <Text style={styles.facebookButtonText}>
            <Text style={styles.facebookIcon}>f</Text> Log in with Facebook
          </Text>
        </TouchableOpacity>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={[styles.separatorText, isDark && styles.darkText]}>OR</Text>
          <View style={styles.separatorLine} />
        </View>

        <View style={styles.formContainer}>
          <AuthTextInput
            placeholder="Mobile Number or Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <AuthTextInput
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
          />
          <AuthTextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <AuthTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Text style={[styles.policyText, isDark && styles.darkText]}>
            By signing up, you agree to our{' '}
            <Text style={styles.link}>Terms</Text>, <Text style={styles.link}>Data Policy</Text> and{' '}
            <Text style={styles.link}>Cookies Policy</Text>.
          </Text>

          <Button 
            title="Sign up" 
            onPress={handleSignup} 
            style={styles.signupButton}
            textStyle={styles.signupButtonText}
          />
        </View>

        <View style={styles.loginContainer}>
          <Text style={[styles.loginText, isDark && styles.darkText]}>
            Have an account?{' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Log in
            </Text>
          </Text>
        </View>

        <View style={styles.themeToggleContainer}>
          <Text style={[styles.toggleLabel, isDark && styles.darkText]}>
            {isDark ? 'Dark' : 'Light'} Mode
          </Text>
          <Switch 
            value={isDark} 
            onValueChange={toggleTheme}
            trackColor={{ false: '#767577', true: '#8a8a8a' }}
            thumbColor={isDark ? '#3897f0' : '#f4f3f4'}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  keyboardAvoid: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoText: {
    fontSize: 50,
    fontFamily: Platform.OS === 'ios' ? 'Noteworthy' : 'normal',
    fontWeight: '500',
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  welcomeText: {
    fontSize: 17,
    fontWeight: '600',
    color: '#8e8e8e',
    textAlign: 'center',
    marginBottom: 20,
    maxWidth: 280,
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0095f6',
    borderRadius: 4,
    padding: 12,
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
  },
  facebookButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  facebookIcon: {
    fontWeight: 'bold',
  },
  separator: {
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
  formContainer: {
    width: '100%',
    maxWidth: 350,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    padding: 10,
    marginVertical: 6,
    fontSize: 14,
  },
  policyText: {
    fontSize: 12,
    color: '#8e8e8e',
    textAlign: 'center',
    marginVertical: 15,
  },
  signupButton: {
    backgroundColor: '#0095f6',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
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
