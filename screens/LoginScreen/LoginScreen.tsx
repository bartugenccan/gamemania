import React, { useState } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input, Button } from "@rneui/base";
import styles from "./login.style";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      const userData = { email: email, password: password };
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(userData));
      console.log("Login successfull", user);
    } catch (error: any) {
      // Login failed
      const errorMessage = error.message;
      Alert.alert("Login failed", errorMessage);
    }
  };

  const handleRegister = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then(() => {
          // Register successfull
          Alert.alert("Register Successfull");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setIsRegistering(!isRegistering);
        })
        .catch((error) => {
          // Register failed
          const errorMessage = error.message;
          console.log("Register failed", errorMessage);

          Alert.alert("Register failed", errorMessage);
        });
    } else {
      Alert.alert("Password and Confirm Password must be the same");
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ type: "font-awesome", name: "envelope" }}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={{ type: "font-awesome", name: "lock" }}
      />
      {isRegistering && (
        <Input
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          leftIcon={{ type: "font-awesome", name: "lock" }}
        />
      )}
      {isRegistering ? (
        <Button
          title="SIGN UP"
          buttonStyle={{
            backgroundColor: "black",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={handleRegister}
        />
      ) : (
        <Button
          title="LOG IN"
          buttonStyle={{
            backgroundColor: "black",
            borderWidth: 2,
            borderColor: "white",
            borderRadius: 30,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          titleStyle={{ fontWeight: "bold" }}
          onPress={handleLogin}
        />
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
