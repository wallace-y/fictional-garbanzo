import * as React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import {
  List,
  Text,
  ActivityIndicator,
  Button,
  Avatar,
  TextInput,
  IconButton,
} from "react-native-paper";
import { getIndividualCouponBook } from "../utils/fetchIndividualCouponBook";
import { addNewCouponToCouponBook } from "../utils/addNewCouponToCouponBook";
import IconSelectionList from "./IconSelectionList";

export default function IndividualCouponBook({ route, navigation }) {
  const { coupon_book_id, image, sender_name, title } = route.params;

  const [allCoupons, setAllCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addingCoupon, setAddingCoupon] = useState(false);
  const [newCouponTitle, setNewCouponTitle] = useState("");
  const [newCouponContent, setNewCouponContent] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);

  useEffect(() => {
    try {
      setLoading(true);
      getIndividualCouponBook(coupon_book_id).then((data) => {
        setAllCoupons(data);
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleAddCoupon = () => {
    try {
      setAddingCoupon(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmitCoupon = () => {
    try {
      setAddingCoupon(false);
      addNewCouponToCouponBook(
        newCouponTitle,
        newCouponContent,
        selectedIcon,
        coupon_book_id
      );
      setAllCoupons((prevList) => [
        ...prevList,
        {
          title: newCouponTitle,
          content: newCouponContent,
          icon: selectedIcon,
        },
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  const onSelectIcon = (iconName) => {
    setSelectedIcon(iconName);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.heading} variant="displaySmall">
            {title}
          </Text>
          <Button onPress={() => navigation.goBack()}>Go Back</Button>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.cover} />
          <View style={styles.senderInfo}>
            <Text style={styles.senderText}>Sent by: {sender_name}</Text>
            <Avatar.Image
              size={64}
              source={{ uri: "https://picsum.photos/100" }}
            />
          </View>
        </View>
        <View>
          <Button mode="outlined" icon="plus-thick" onPress={handleAddCoupon}>
            Add Coupon
          </Button>
          {addingCoupon ? (
            <View>
              <TextInput
                label="Coupon Headline"
                value={newCouponTitle}
                onChangeText={(text) => setNewCouponTitle(text)}
              />
              <TextInput
                label="Coupon Content"
                value={newCouponContent}
                onChangeText={(text) => setNewCouponContent(text)}
                multiline={true}
                numberOfLines={4}
              />
              <IconSelectionList onSelectIcon={onSelectIcon} />
              <Button onPress={handleSubmitCoupon}>Create New Coupon</Button>
            </View>
          ) : null}
        </View>
        {loading ? (
          <ActivityIndicator animating={true} size={"large"} color="#0000ff" />
        ) : (
          <ScrollView>
            <List.Section>
              {allCoupons.map((coupon, index) => {
                return (
                  <List.Item
                    key={index}
                    title={coupon.title}
                    description={coupon.content}
                    left={() => <List.Icon icon={coupon.icon} />}
                  />
                );
              })}
            </List.Section>
          </ScrollView>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: "20%",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  imageContainer: {
    marginBottom: 16,
    alignItems: "center",
  },
  cover: {
    width: "100%",
    height: 200,
    marginBottom: 8,
  },
  senderInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  senderText: {
    marginRight: 8,
  },
});
