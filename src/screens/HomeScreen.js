import React, { useContext } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { AppContext } from '../context/AppContext';
import { products } from '../data/products';

export default function HomeScreen({ navigation }) {
  const { user, logout } = useContext(AppContext);

  return (
    <View style={{ padding: 10 }}>

      {/* HEADER */}
      <Text testID="welcomeLabel" style={{ fontSize: 22, fontWeight: 'bold' }}>
        Welcome to Market
      </Text>

      {/* USER WELCOME */}
      {user && (
        <Text testID="userWelcome" style={{ marginTop: 10 }}>
          Welcome {user.username}
        </Text>
      )}

      {/* MENU */}
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        {!user ? (
          <Button
            title="Login"
            onPress={() => navigation.navigate('Login')}
          />
        ) : (
          <Button title="Logout" onPress={logout} />
        )}

        <Button
          title="Cart"
          onPress={() => navigation.navigate('Cart')}
        />
      </View>

      {/* PRODUCTS */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 15 }}>
            <Text>{item.name}</Text>
            <Text>${item.price}</Text>

            <Button
              title="View"
              onPress={() =>
                navigation.navigate('Details', { product: item })
              }
            />
          </View>
        )}
      />
    </View>
  );
}