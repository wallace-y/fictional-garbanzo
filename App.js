import * as React from "react";
import { useEffect, useState } from "react";
import { name as appName } from "./app.json";
import { PaperProvider } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import LandingPage from "./components/LandingPage.jsx";
import CouponBookList from "./components/CouponBookList.jsx";
import IndividualCouponBook from "./components/IndividualCouponBook.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import CouponCreator from "./components/CouponCreator.jsx";
import CouponBookEditor from "./components/CouponBookEditor";
import { auth } from "./firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import theme from "./styling/theme";

const Tab = createBottomTabNavigator();
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

  const tabBarOptions = {
    activeTintColor: "#6200ee",
    inactiveTintColor: "gray",
    labelStyle: { fontSize: 16, fontWeight: "bold" },
  };

  const homeStackOptions = {
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      return <Ionicons name="home-outline" size={size} color={color} />;
    },
  };

  const createCouponStackOptions = {
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      return <Ionicons name="create-outline" size={size} color={color} />;
    },
  };

  const couponBookListStackOptions = {
    headerShown: false,
    tabBarIcon: ({ focused, color, size }) => {
      return <Ionicons name="book-outline" size={size} color={color} />;
    },
  };

  const HomeStackScreen = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={LandingPage}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  const CouponBookScreen = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="CouponBookList"
        component={CouponBookList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IndividualCouponBook"
        component={IndividualCouponBook}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CouponBookEditor"
        component={CouponBookEditor}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  const CouponCreatorScreen = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="CouponCreator"
        component={CouponCreator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CouponBookEditor"
        component={CouponBookEditor}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        {authenticated ? (
          <Tab.Navigator screenOptions={tabBarOptions}>
            <Tab.Screen
              name="Home"
              component={HomeStackScreen}
              options={homeStackOptions}
            />
            <Tab.Screen
              name="Create"
              component={CouponCreatorScreen}
              options={createCouponStackOptions}
            />
            <Tab.Screen
              name="Read"
              component={CouponBookScreen}
              options={couponBookListStackOptions}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LoginScreen} />
          </Stack.Navigator>
        )}
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
