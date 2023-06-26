import * as React from "react";
import { Text } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

const CouponList = ({ navigation }) => (
  <View style={styles.container}>
    <Text style={styles.heading} variant="displayLarge">
      Careful Coupons.
    </Text>

    <Text style={styles.heading} variant="displaySmall">
      Create. Share. Care.
    </Text>
    <Text style={styles.heading}>
      Create personal coupons for those you love. Share your personal coupon
      book. Show you care.
    </Text>
  </View>
);

export default CouponList;

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
