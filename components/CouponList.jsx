import * as React from "react";
import { View, Text,StyleSheet } from "react-native";
import { List } from "react-native-paper";
import Coupon from "./Coupon";

const CouponList = () => (
  <View style={styles.container}>
    <List.AccordionGroup>
      <List.Accordion title="Accordion 1" id="1">
        <Coupon />
      </List.Accordion>

      <List.Accordion title="Accordion 2" id="2">
        <Coupon />
      </List.Accordion>

      <List.Accordion title="Accordion 3" id="3">
        <Coupon />
      </List.Accordion>
      <List.Accordion title="Accordion 4" id="4">
        <Coupon />
      </List.Accordion>
      <List.Accordion title="Accordion 5" id="5">
        <Coupon />
      </List.Accordion>
    </List.AccordionGroup>
  </View>
);

export default CouponList;

const styles = StyleSheet.create({
    container: {
      justifyContent: "center",
      marginBottom: "20%",
    },
  });