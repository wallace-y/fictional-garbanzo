import * as React from "react";
import {
  Text,
  IconButton,
  Avatar,
  useTheme,
  Button,
  TextInput,
} from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { claimCouponBook } from "../utils/claimCouponBook";
import { useState } from "react";

const Claim = ({ navigation }) => {
  const theme = useTheme();
  const [couponCode, setCouponCode] = useState(null);

  const handleClaim = () => {
    try {
      claimCouponBook(couponCode, (success) => {
        if (success) {
          navigation.navigate("CouponBookList");
          setCouponCode(null);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text variant="headlineLarge" style={[{ color: theme.colors.text }]}>
          Claim a coupon book
        </Text>
      </View>
      <View style={styles.welcome}>
        <Text variant="bodyLarge">Welcome to digital coupon books!</Text>
        <Text variant="bodyMedium">
          To claim a coupon, please enter the code below and click claim.
        </Text>
      </View>
      <View>
        <TextInput
          mode="outlined"
          label="Coupon Code"
          value={couponCode}
          onChangeText={(text) => setCouponCode(text)}
        ></TextInput>
        <Button mode="elevated" onPress={handleClaim}>
          Claim
        </Button>
      </View>
    </View>
  );
};

export default Claim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  header: {
    marginTop: "10%",
    alignItems: "center",
    marginBottom: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 5,
    borderRadius: 8,
  },
  welcome: {
    alignItems: "center",
  },
});
