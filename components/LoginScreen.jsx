import { KeyboardAvoidingView, View } from "react-native";
import React, { useState } from "react";
import { TextInput, ActivityIndicator, Button } from "react-native-paper";
import { auth } from "../firebaseConfig.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error);
      alert("Sign in failed: " + error.message);
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
        password
      );
    } catch (error) {
      console.log(error);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding">
      <View>
        <TextInput
          label="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          label="Password"
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>
      {loading ? (
        <ActivityIndicator animating={true} size={"large"} color="#0000ff" />
      ) : (
        <>
          <View>
            <Button mode="contained" onPress={signIn}>
              Login
            </Button>
          </View>
          <View>
            
            <Button mode="outlined" onPress={signUp}>
              Register
            </Button>
          </View>
        </>
      )}
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
