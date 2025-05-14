import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from 'expo-router';

export default function WelcomeScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Welcome to Koala</Text>
      <Text style={styles.subtitle}>Your Neighborhood Library</Text>
      
      <View style={styles.imageContainer}>
        {/* Placeholder for a logo/image */}
        <View style={styles.logoPlaceholder}>
          <Text style={styles.logoText}>🐨</Text>
        </View>
      </View>
      
      <Link href="/auth/phone" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFAE0',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#283618',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    color: '#606C38',
  },
  imageContainer: {
    marginBottom: 40,
  },
  logoPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#DDA15E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 80,
  },
  button: {
    backgroundColor: '#BC6C25',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#FEFAE0',
    fontSize: 18,
    fontWeight: 'bold',
  },
});