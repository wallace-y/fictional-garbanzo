import * as React from "react";
import { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Share } from "react-native";
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
  const { coupon_book_id, image, sender_name, title, recipient } = route.params;

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

  const shareCouponBook = () => {
    const shareOptions = {
      message: `${sender_name} has sent you a digital coupon book!
      
      To claim this coupon book:
      1. Download the Digital Coupon Book app from the Google Play Store [Link TBC]
      2. Register for an account and sign in
      3. Click the claim button on the home page and enter the following code:
      *${coupon_book_id}*
      
      Enjoy!`    };

    Share.share(shareOptions)
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text variant="displaySmall">{title}</Text>
          </View>
          <View style={styles.headerDetails}>
            <View style={styles.recipient}>
              <Text variant="bodyLarge">For {recipient}</Text>
            </View>
            <Button mode="elevated" onPress={() => navigation.goBack()}>
              Go Back
            </Button>
          </View>
        </View>
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.cover} />
          <View style={styles.senderInfo}>
            <Text style={styles.senderText}>Sent by: {sender_name}</Text>
            <Avatar.Image
              size={64}
              source={{ uri: "https://picsum.photos/100" }}
            />
            <Button
              icon="share-variant"
              mode="elevated"
              onPress={shareCouponBook}
            >
              Share{" "}
            </Button>
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
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 16,
  },
  headerDetails: {
    marginTop: 8,
    alignItems: "center",
  },
  recipient: {
    marginBottom: 15,
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
