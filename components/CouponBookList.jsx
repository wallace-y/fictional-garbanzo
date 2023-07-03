import * as React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView,RefreshControl } from "react-native";
import { List, Text, ActivityIndicator } from "react-native-paper";
import { getAllCouponBooks } from "../utils/fetchCouponForMe";
import { getAllMyCouponBooksForOthers } from "../utils/fetchCouponsForOthers.js";
import CouponCard from "./CouponCard";

export default function CouponBookList({ navigation }) {
  const [allOwnCoupons, setAllOwnCoupons] = useState([]);
  const [couponsForOthers, setCouponsForOthers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      getAllCouponBooks().then((data) => {
        setAllOwnCoupons(data);
      });
      getAllMyCouponBooksForOthers().then((data) => {
        setCouponsForOthers(data);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    setRefreshing(true); // Set refreshing state to true when the user pulls down the page
    fetchData(); // Fetch the data again
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <View style={styles.container}>
        <Text style={styles.heading} variant="titleLarge">
          Your Tokens FROM others.
        </Text>
        {loading ? (
          <ActivityIndicator animating={true} size={"large"} color="#0000ff" />
        ) : (
          <List.AccordionGroup>
            {allOwnCoupons.map((coupon, index) => {
              return (
                <List.Accordion
                  title={`Your tokens from ${coupon.sender_name}`}
                  id={`coupon-${index}`}
                  key={index}
                >
                  <CouponCard
                    title={coupon.title}
                    image={coupon.image}
                    coupon_book_id={coupon.coupon_book_id}
                    sender_name={coupon.sender_name}
                    onOpen={() =>
                      navigation.navigate("IndividualCouponBook", {
                        title: coupon.title,
                        coupon_book_id: coupon.coupon_book_id,
                        sender_name: coupon.sender_name,
                        image: coupon.image,
                      })
                    }
                  />
                </List.Accordion>
              );
            })}
          </List.AccordionGroup>
        )}
        <Text style={styles.heading} variant="titleLarge">
          Your Tokens FOR others.
        </Text>
        {loading ? (
          <ActivityIndicator animating={true} size={"large"} color="#0000ff" />
        ) : (
          <List.AccordionGroup>
            {couponsForOthers.map((coupon, index) => {
              return (
                <List.Accordion
                  title={coupon.title}
                  id={`coupon-${index}`}
                  key={index}
                >
                  <CouponCard
                    title={coupon.title}
                    image={coupon.image}
                    coupon_book_id={coupon.coupon_book_id}
                    onOpen={() =>
                      navigation.navigate("CouponBookEditor", {
                        title: coupon.title,
                        coupon_book_id: coupon.coupon_book_id,
                        sender_name: coupon.sender_name,
                        image: coupon.image,
                      })
                    }
                  />
                </List.Accordion>
              );
            })}
          </List.AccordionGroup>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    marginTop: "20%",
  },
  heading: {
    marginTop: 16,
    marginBottom: 32,
    textAlign: "center",
  },
});
