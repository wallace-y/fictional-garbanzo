import * as React from "react";
import { Text, IconButton, useTheme } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LandingPage = () => {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.headerContainer,{ backgroundColor: theme.colors.primary }]}>
        <MaterialCommunityIcons
          name="hand-heart"
          size={80}
          color={theme.colors.text}
        />
        <Text
          style={[styles.heading, { color: theme.colors.text }]}
          variant="displayLarge"
        >
          Care Coupons.
        </Text>
        <Text
          style={[styles.heading, { color: theme.colors.accent }]}
          variant="displaySmall"
        >
          Create. Share. Care.
        </Text>
      </View>
      <Text style={[styles.heading, { color: theme.colors.text }]}>
        Create personal tokens for those you love.
      </Text>
      <Text style={[styles.heading, { color: theme.colors.text }]}>
        Share your personal token book.
      </Text>
      <Text style={[styles.heading, { color: theme.colors.text }]}>
        Show you care.
      </Text>
    </View>
  );
};

export default LandingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  heading: {
    marginBottom: 24,
    textAlign: "center",
  },
  headerContainer: {
    width: "90%",
    alignItems: "center",
    borderWidth: 5,
    marginBottom: 15
  }
});
