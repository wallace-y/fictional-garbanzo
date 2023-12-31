import { KeyboardAvoidingView, View, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import {
  TextInput,
  ActivityIndicator,
  Button,
  Text,
  Avatar,
  useTheme,
} from 'react-native-paper';
import { auth } from '../firebaseConfig.js';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      alert('Sign in failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
    } catch (error) {
      console.log(error);
      alert('Registration failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text variant="displayMedium" style={[{ color: theme.colors.text }]}>
          Care Coupons
        </Text>
      </View>
      <View style={styles.logoContainer}>
        <Avatar.Icon size={78} icon="hand-heart" />
      </View>

      <TextInput
        label="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        mode="outlined"
        autoCapitalize="none"
      />
      <TextInput
        mode="outlined"
        label="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize="none"
      />
      {loading ? (
        <ActivityIndicator
          animating={true}
          size="large"
          color={theme.colors.primary}
        />
      ) : (
        <View style={styles.buttonGroup}>
          <Button mode="contained" onPress={signIn} style={styles.button}>
            Login
          </Button>
          <Button mode="contained" onPress={signUp} style={styles.button}>
            Register
          </Button>
          <Text variant="bodySmall" style={styles.forgotPw}>
            Forgot password?
          </Text>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 5,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 5,
    borderRadius: 8,
  },
  heading: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
  },
  buttonGroup: {
    marginTop: 16,
  },
  button: {
    marginBottom: 10,
  },
  forgotPw: {
    textAlign: 'center',
  },
});
