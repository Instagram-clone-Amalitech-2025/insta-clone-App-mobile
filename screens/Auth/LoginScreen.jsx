import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Switch, Image, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import AuthTextInput from '../../components/Auth/AuthTextInput';
import Button from '../../components/Common/Button';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const isDark = theme === 'dark';

  const handleLogin = () => {
    login({ email });
  };

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.logoContainer}>
          {/* Instagram logo - using a placeholder that would be replaced with actual logo */}
          <Text style={[styles.logoText, isDark && styles.darkText]}>Instagram</Text>
        </View>

        <View style={styles.formContainer}>
          <AuthTextInput
            placeholder="Phone number, username, or email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <AuthTextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            style={styles.input}
          />

          <Button 
            title="Log in" 
            onPress={handleLogin} 
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
          />

          <View style={styles.forgotContainer}>
            <TouchableOpacity>
              <Text style={styles.forgotText}>Forgot password?</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={[styles.separatorText, isDark && styles.darkText]}>OR</Text>
          <View style={styles.separatorLine} />
        </View>

        <TouchableOpacity style={styles.facebookLogin}>
          <Text style={styles.facebookText}>
            <Text style={styles.facebookIcon}>f</Text> Log in with Facebook
          </Text>
        </TouchableOpacity>

        <View style={styles.bottomContainer}>
          <View style={styles.signupContainer}>
            <Text style={[styles.signupText, isDark && styles.darkText]}>
              Don't have an account?{' '}
              <Text style={styles.link} onPress={() => navigation.navigate('Signup')}>
                Sign up
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
    marginBottom: 30,
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
  loginButton: {
    backgroundColor: '#0095f6',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  forgotContainer: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotText: {
    color: '#0095f6',
    fontSize: 12,
    fontWeight: '500',
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    marginVertical: 20,
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
  facebookLogin: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },  
  facebookText: {
    color: '#385185',
    fontWeight: '600',
    fontSize: 14,
  },
  facebookIcon: {
    fontWeight: 'bold',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: '#dbdbdb',
    paddingTop: 20,
    marginBottom: 20,
  },
  signupText: {
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
  },
  toggleLabel: {
    marginRight: 10,
    fontSize: 12,
    color: '#8e8e8e',
  },
});