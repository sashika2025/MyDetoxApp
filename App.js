import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AppProvider, { AppContext } from './src/context/AppContext';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import ProductDetails from './src/screens/ProductDetails';
import CartScreen from './src/screens/CartScreen';
import CheckoutScreen from './src/screens/CheckoutScreen';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user } = useContext(AppContext);

  return (
    <Stack.Navigator>
      {/* HOME ALWAYS FIRST */}
      <Stack.Screen name="Home" component={HomeScreen} />

      {/* LOGIN AS MENU SCREEN */}
      <Stack.Screen name="Login" component={LoginScreen} />

      <Stack.Screen name="Details" component={ProductDetails} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Checkout" component={CheckoutScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AppProvider>
  );
}