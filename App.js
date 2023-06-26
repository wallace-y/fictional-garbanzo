import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import Nav from "./components/Nav.jsx";
import CouponList from "./components/CouponList.jsx";
import Banner from "./components/Banner.jsx";
import AddButton from "./components/AddButton.jsx";
import Header from "./components/Header.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

export default function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthenticated(user !== null);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <PaperProvider>
      <View style={styles.container}>
        {authenticated ? (
          <>
            <Header />
            <Banner />
            <AddButton />
            <CouponList />
            <Nav />
          </>
        ) : (
          <LoginScreen />
        )}
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: "20%",
  },
});
