import * as React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";

const LandingPage = () => (
  <View style={styles.container}>
    <Text style={styles.heading} variant="displayLarge">
      Tender Tokens.
    </Text>
    <Text style={styles.heading} variant="displaySmall">
      Create. Share. Care.
    </Text>
    <Text style={styles.heading}>
      Create personal tokens for those you love.
    </Text>
    <Text style={styles.heading}>Share your personal token book.</Text>
    <Text style={styles.heading}>Show you care.</Text>
  </View>
);

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    marginBottom: 32,
    textAlign: "center",
  },
  button: {
    marginVertical: 8,
    width: "80%",
  },
  buttonText: {
    fontSize: 16,
  },
});
