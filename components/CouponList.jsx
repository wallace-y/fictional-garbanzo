import * as React from "react";
import { View, StyleSheet } from "react-native";
import { List, Text } from "react-native-paper";
import Coupon from "./CouponCard";

const CouponList = () => (
  <View style={styles.container}>
    <Text style={styles.heading} variant="displayLarge">
      Your Tokens.
    </Text>
    <List.AccordionGroup>
      <List.Accordion title="Your tokens from Paul" id="1">
        <Coupon title="Paul's Coupons for Cam" subtitle="Happy birthday!"/>
      </List.Accordion>

      <List.Accordion title="Your token from Corinna" id="2">
        <Coupon />
      </List.Accordion>

      <List.Accordion title="Your tokens from Sally" id="3">
        <Coupon />
      </List.Accordion>
    </List.AccordionGroup>
  </View>
);

export default CouponList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: "20%",
  },
  heading: {
    marginBottom: 32,
    textAlign: "center",
  },
});
