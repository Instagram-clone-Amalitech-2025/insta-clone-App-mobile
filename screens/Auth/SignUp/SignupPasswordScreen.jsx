import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import AuthTextInput from '../../../components/Auth/AuthTextInput';
import Button from '../../../components/Common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../../../redux/slices/authSlice';
import { Feather } from '@expo/vector-icons';

export default function SignupPasswordScreen({ route, navigation }) {
  const { identifier, fullName, username } = route.params;
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.theme);
  const isDark = theme === 'dark';

  const handleSignup = () => {
    if (password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    dispatch(signup({ email: identifier, full_name: fullName, username, password }));
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
        <Text style={[styles.title, isDark && styles.darkText]}>Create a Password</Text>
        <Text style={[styles.subtitle, isDark && styles.darkMutedText]}>
          Create a password with at least 6 letters or numbers. It should be something others can't guess.
        </Text>
        <View style={styles.passwordInputContainer}>
            <AuthTextInput
            placeholder="Password"
            secureTextEntry={!isPasswordVisible}
            value={password}
            onChangeText={setPassword}
            style={[styles.input, isDark && styles.darkInput]}
            />
        </View>

        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.showHideButton}>
          <Text style={[styles.showHideText, isDark && styles.darkShowHideText]}>
            {isPasswordVisible ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <Button
          title={loading ? "Signing Up..." : "Complete Sign Up"}
          onPress={handleSignup}
          style={[styles.button, isDark && styles.darkButton]}
          textStyle={[styles.buttonText, isDark && styles.darkButtonText]}
          disabled={loading}
        />


        <View style={styles.loginContainer}>
                  <Text style={[styles.loginText, isDark && styles.darkText]}>
                    Or{' '}
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
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: '100%',
    marginVertical: 10,
  },
  input: {
    backgroundColor: '#fafafa',
    borderWidth: 1,
    borderColor: '#dbdbdb',
    borderRadius: 4,
    padding: 16,
    fontSize: 14,
    color: '#000000',
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
    width: '100%',
  },
  darkButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  showHideButton: {
    alignSelf: 'flex-end', 
    paddingVertical: 5,    
    marginBottom: 10,  
  },
  showHideText: {
    color: '#0095f6', 
    fontWeight: '600',
  },
  darkShowHideText: {
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
});
