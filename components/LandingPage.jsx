import * as React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CouponList = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.heading} variant="displayLarge">
      Careful Coupons.
    </Text>
    <Button
      mode="contained"
      onPress={() => navigation.navigate("CouponCreator")}
      type="elevated"
      style={styles.button}
      labelStyle={styles.buttonText}
    >
      Create Coupons
    </Button>
    <Button
      mode="contained"
      onPress={() => navigation.navigate("CouponList")}
      type="elevated"
      style={styles.button}
      labelStyle={styles.buttonText}
    >
      View My Coupons
    </Button>
  </View>
);

export default CouponList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  heading: {
    marginBottom: 32,
  },
  button: {
    marginVertical: 8,
    width: "80%",
  },
  buttonText: {
    fontSize: 16,
  },
});
