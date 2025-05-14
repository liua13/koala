import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';

export default function PhoneAuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const { signIn } = useAuth();

  const handleContinue = async () => {
    if (!phoneNumber) return;
    
    try {
      // Eventually this would actually validate the phone number with Supabase
      await signIn(phoneNumber);
      
      // Navigate directly to the library tab
      router.replace('/(tabs)/library');
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.content}>
        <Text style={styles.title}>Enter your phone number</Text>
        <Text style={styles.subtitle}>We'll send you a verification code</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="(555) 555-5555"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            contextMenuHidden={true}
            selectTextOnFocus={false}
            spellCheck={false}
            autoCorrect={false}
            placeholderTextColor="#606C38"
          />
        </View>
        
        <TouchableOpacity 
          style={[styles.button, !phoneNumber && styles.buttonDisabled]}
          disabled={!phoneNumber}
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
        
        <Text style={styles.terms}>
          By continuing, you agree to receive SMS messages and our Terms of Service and Privacy Policy
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#283618',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#606C38',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#DDA15E',
    width: '100%',
    color: '#283618',
  },
  button: {
    backgroundColor: '#BC6C25',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#DDA15E',
    opacity: 0.7,
  },
  buttonText: {
    color: '#FEFAE0',
    fontSize: 18,
    fontWeight: 'bold',
  },
  terms: {
    marginTop: 20,
    textAlign: 'center',
    color: '#606C38',
    fontSize: 12,
  },
});