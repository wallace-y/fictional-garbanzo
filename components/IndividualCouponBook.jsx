import * as React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { List, Text, ActivityIndicator, Button } from "react-native-paper";
import { getAllCouponBooks } from "../utils/fetchCouponBooks";
import CouponCard from "./CouponCard";

export default function IndividualCouponBook({ route, navigation }) {

const {coupon_id, image, sender_name, title} = route.params

  const [allCoupons, setAllCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  //   useEffect(() => {
  //     try {
  //       setLoading(true);
  //       getAllCouponBooks().then((data) => {
  //         setAllCoupons(data);
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading} variant="displayLarge">
        Your Tokens from {sender_name}
      </Text>
      <Text style={styles.heading} variant="displayLarge">
        {title}
      </Text>
      <Button onPress={() => navigation.goBack() }>Go Back</Button>
      {/* {loading ? (
        <ActivityIndicator animating={true} size={"large"} color="#0000ff" />
      ) : (
        <List.AccordionGroup>
          {allCoupons.map((coupon, index) => {
            return (
              <List.Accordion
                title={`Your tokens from ${coupon.sender_name}`}
                id={`coupon-${index}`}
                key={index}
              >
                <CouponCard title={coupon.title} image={coupon.image} />
              </List.Accordion>
            );
          })}
        </List.AccordionGroup>
      )} */}
    </View>
  );
}

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
