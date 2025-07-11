import React, { useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AuthTextInput from '../../components/Auth/AuthTextInput';
import Button from '../../components/Common/Button';
import { login } from '../../redux/slices/authSlice';
import { setTokenAndUser } from '../../redux/slices/userSlice'; 

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

   const auth = useSelector((state) => state.auth);

    const handleLogin = async () => {
  if (!username || !password) {
    alert('Please enter both username and password.');
    return;
  }

  try {
    const resultAction = await dispatch(login({ username, password }));

    if (login.fulfilled.match(resultAction)) {
      const { access } = resultAction.payload;

      console.log('✅ Login Response:', resultAction.payload);
      await dispatch(setTokenAndUser({ token: access }));
    } else {
      console.log('❌ Login failed:', resultAction.payload);
      alert(resultAction.payload);
    }
  } catch (err) {
    console.error('🔥 Unexpected login error:', err);
  }
};




const { isAuthenticated } = useSelector((state) => state.auth);

useEffect(() => {
  if (isAuthenticated) {
navigation.replace('MainTabs', { screen: 'HomeScreen' });
  }
}, [isAuthenticated]);

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <View style={styles.logoContainer}>
          <Text style={[styles.logoText, isDark && styles.darkText]}>Instagram</Text>
        </View>

        <View style={styles.formContainer}>
          <AuthTextInput
            placeholder="Phone number, username, or email"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <AuthTextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.showHideButton}>
            <Text style={[styles.showHideText, isDark && styles.darkShowHideText]}>
              {isPasswordVisible ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}
          <Button 
            title={loading ? "Logging In..." : "Log In"}
            onPress={handleLogin} 
            style={styles.loginButton}
            textStyle={styles.loginButtonText}
            disabled={loading || !username.trim() || !password.trim()}
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
            <Text style={styles.facebookIcon}></Text> Log in with Facebook
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
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 50,
    marginBottom: 20,
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
  showHideButton: {
    alignSelf: 'flex-end',
    paddingVertical: 5,
    marginBottom: 5,
  },
  showHideText: {
    color: '#0095f6',
    fontWeight: '600',
  },
  darkShowHideText: {
    color: '#007bff',
  },
});