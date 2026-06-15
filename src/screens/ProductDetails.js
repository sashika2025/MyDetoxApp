import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function ProductDetails({ route }) {
  const { product } = route.params;
  const { addToCart } = useContext(AppContext);

  return (
    // 1. Add an ID to the main screen wrapper container
    <View testID="productDetailsPage">
      {/* 2. Add dynamic IDs to the text fields using product.id */}
      <Text testID={`detailProductName_${product.id}`}>{product.name}</Text>
      <Text testID={`detailProductPrice_${product.id}`}>${product.price}</Text>

      {/* 3. Add an ID to your Add to Cart button */}
      <Button 
        testID="detailAddToCartButton" 
        title="Add to Cart" 
        onPress={() => addToCart(product)} 
      />
    </View>
  );
}