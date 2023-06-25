import * as React from "react";
import { AppRegistry, ScrollView } from "react-native";
import { PaperProvider } from "react-native-paper";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Nav from "./components/Nav.jsx";
import CouponList from "./components/CouponList.jsx";
import Banner from "./components/Banner.jsx";
import AddButton from "./components/AddButton.jsx";
import Header from "./components/Header.jsx";

export default function App() {
  return (
    <PaperProvider>
      <ScrollView>
        <View style={styles.container}>
          <Header />
          <Banner />
          <AddButton />
          <CouponList />
        </View>
      </ScrollView>
      <Nav />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    // alignItems: "center",
    justifyContent: "center",
    marginTop: "20%",
  },
});
