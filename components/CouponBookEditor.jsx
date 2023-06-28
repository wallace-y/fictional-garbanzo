import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function CouponBookEditor({ route }) {
    const {title,image} = route.params
  return (
    <View style={styles.container}>
      <Card>
        <Card.Content>
          <Card.Title title={title} />
        </Card.Content>
        <Card.Cover source={{ uri: image }} />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: "20%",
    padding: 16,
  },

});
