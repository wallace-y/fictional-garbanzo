import * as React from "react";
import { useEffect, useState } from "react";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import Nav from "./components/Nav.jsx";
import LandingPage from "./components/LandingPage.jsx";
import CouponList from "./components/CouponList.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import CouponCreator from "./components/CouponCreator.jsx";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

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
    <NavigationContainer>
      <PaperProvider>
        <Stack.Navigator initialRouteName="Landing">
          {authenticated ? (
            <>
              <Stack.Screen name="Landing" component={LandingPage} />
              <Stack.Screen name="CouponCreator" component={CouponCreator} />
              <Stack.Screen name="CouponList" component={CouponList} />
            </>
          ) : (
            <Stack.Screen name="Login" component={LoginScreen} />
          )}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: "20%",
  },
});
