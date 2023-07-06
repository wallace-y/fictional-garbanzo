import * as React from "react";
import { Text, IconButton, Avatar, useTheme, Button } from "react-native-paper";
import { View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Profile = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
        <Text variant="displayMedium" style={[{ color: theme.colors.text }]}>
          Profile
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Avatar.Image size={128} source={{ uri: "https://picsum.photos/100" }} />
      </View>

      <Text
        style={[styles.heading, { color: theme.colors.text }]}
        variant="bodyLarge"
      >
       First name - last name
      </Text>

    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 15,

  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  header: {
    marginTop: "10%",
    marginBottom: 30,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderWidth: 5,
    borderRadius: 8,
  },
  heading: {

    textAlign: "center",
  },
  headerContainer: {
    width: "90%",
    alignItems: "center",
    borderWidth: 5,
    marginBottom: 15,
  },
});
