import * as React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const CouponCard = ({ title, subtitle }) => (
  <Card>
    <Card.Title title={title} subtitle={subtitle} left={LeftContent} />

    <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
    <Card.Actions>
      <Button>Close</Button>
      <Button>Open</Button>
    </Card.Actions>
  </Card>
);

export default CouponCard;
