import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";

// const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const CouponCard = ({
  title,
  subtitle,
  image,
  onOpen,
}) => (
  <Card>
    <Card.Title title={title} subtitle={subtitle} />

    <Card.Cover source={{ uri: image }} />
    <Card.Actions>
      <Button>Close</Button>
      <Button onPress={onOpen}>Open</Button>
    </Card.Actions>
  </Card>
);

export default CouponCard;
