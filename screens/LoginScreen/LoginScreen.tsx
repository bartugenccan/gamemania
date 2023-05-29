import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = () => {
    // Giriş işlemlerini burada gerçekleştir
  };

  const handleRegister = () => {
    // Kayıt işlemlerini burada gerçekleştir
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {isRegistering ? (
        <Button title="Register" onPress={handleRegister} />
      ) : (
        <Button title="Login" onPress={handleLogin} />
      )}
      <Text onPress={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </Text>
    </View>
  );
};

export default LoginScreen;
