import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { deleteUserAccount } from '../../utils/auth';

const DeleteAccountButton = () => {
  const navigation = useNavigation();

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount();
      // Navigate to the appropriate screen after account deletion, e.g., the auth screen
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error deleting account:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
      <Text style={styles.buttonText}>Delete Account</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeleteAccountButton;
