import React, { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function CartScreen({ navigation }) {
  const { cart, clearCart } = useContext(AppContext);

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <View>
      <Text>Cart</Text>

      <FlatList
        data={cart}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <Text>{item.name} - ${item.price}</Text>
        )}
      />

      <Text>Total: ${total}</Text>

      <Button
        title="Checkout"
        onPress={() => {
          clearCart();
          navigation.navigate('Checkout');
        }}
      />
    </View>
  );
}