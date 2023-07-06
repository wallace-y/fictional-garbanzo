import * as React from "react";
import { Text, IconButton, Avatar, useTheme, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LandingPage = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text variant="displayMedium" style={[{ color: theme.colors.text }]}>
          Care Coupons
        </Text>
      </View>
      <View style={styles.logoContainer}>
        <Avatar.Icon size={78} icon="hand-heart" />
      </View>

      <Text
        style={[styles.heading, { color: theme.colors.text }]}
        variant="bodyLarge"
      >
        <Text style={[{ color: theme.colors.accent }]}>Create</Text> personal
        tokens for those you love.
      </Text>
      <Text
        style={[styles.heading, { color: theme.colors.text }]}
        variant="bodyLarge"
      >
        <Text style={[{ color: theme.colors.accent }]}>Share</Text> your
        personal token book.
      </Text>
      <Text
        style={[styles.heading, { color: theme.colors.text }]}
        variant="bodyLarge"
      >
        <Text style={[{ color: theme.colors.accent }]}>Show</Text> you care.
      </Text>
      <Button mode="contained" onPress={() => navigation.navigate("Create")}>
        Get Started
      </Button>
      <Button mode="elevated" onPress={() => navigation.navigate("Claim")}>
        Claim a coupon book
      </Button>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    marginBottom: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 5,
    borderRadius: 8,
  },
  heading: {
    marginBottom: 24,
    textAlign: "justify",
  },
  headerContainer: {
    width: "90%",
    alignItems: "center",
    borderWidth: 5,
    marginBottom: 15,
  },
});
