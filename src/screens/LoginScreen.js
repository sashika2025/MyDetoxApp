import React, { useContext, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AppContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const success = login(username, password);

    if (success) {
      navigation.navigate('Home'); // return to home
    } else {
      alert('Invalid login');
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Text>Login</Text>

      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Login" onPress={handleLogin} />
    </View>
  );
}