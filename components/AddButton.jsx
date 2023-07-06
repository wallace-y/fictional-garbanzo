import * as React from 'react';
import { Button } from 'react-native-paper';

const AddButton = () => (
  <Button
    icon="plus-thick"
    mode="contained"
    onPress={() => console.log('Pressed')}
    type="elevated"
  >
    Add Coupon
  </Button>
);

export default AddButton;
