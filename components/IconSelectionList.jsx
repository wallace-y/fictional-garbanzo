import React, { useState } from "react";
import { List, Menu, IconButton, Colors } from "react-native-paper";
import { ScrollView } from "react-native";


const IconSelectionList = ({ onSelectIcon }) => {
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [visible, setVisible] = useState(false);

  const icons = [
    { name: "tag", label: "Tag" },
    { name: "ticket", label: "Ticket" },
    { name: "gift", label: "Gift" },
    { name: "shopping", label: "Shopping" },
    { name: "sale", label: "Sale" },
    { name: "percent", label: "Percent" },
    { name: "calendar", label: "Calendar" },
    { name: "credit-card", label: "Credit Card" },
    { name: "cash", label: "Cash" },
    { name: "hand-coin", label: "Coin" },
    { name: "account-cowboy-hat", label: "Cow Folk" },
    { name: "account-hard-hat", label: "DIY" },
    { name: "receipt", label: "Receipt" },
    { name: "wallet", label: "Wallet" },
    { name: "scissors-cutting", label: "Scissors" },
    { name: "cart", label: "Cart" },
    { name: "food", label: "Food" },
    { name: "cupcake", label: "Cupcake" },
    { name: "ice-cream", label: "Ice Cream" },
    { name: "gift-outline", label: "Gift Outline" },
    { name: "tshirt-crew", label: "T-Shirt" },
    { name: "shoe-heel", label: "Shoe" },
  ];

  const handleIconSelection = (iconName) => {
    setSelectedIcon(iconName);
    setVisible(false);
    onSelectIcon(iconName)
  };


  return (
    <List.Section>
      <List.Subheader>Select an Icon</List.Subheader>
      <Menu
        visible={visible}
        onDismiss={() => setVisible(false)}
        anchor={
          <IconButton
            icon={selectedIcon || "dots-vertical"}
            // color={Colors.grey500}
            size={48}
            onPress={() => setVisible(true)}
          />
        }
      >
        <ScrollView style={{ maxHeight: 200 }}>
          {icons.map((icon) => (
            <Menu.Item
              key={icon.name}
              title={icon.label}
              leadingIcon={icon.name}
              onPress={() => handleIconSelection(icon.name)}
            />
          ))}
        </ScrollView>
      </Menu>
    </List.Section>
  );
};

export default IconSelectionList;
