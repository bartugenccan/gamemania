import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { Input, Button } from "@rneui/base";
import styles from "./login.style";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Firebase
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import { FIREBASE_DB } from "../../firebaseConfig";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { setUserData } from "../../store/userSlice";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      const user = userCredential.user;
      const userData = { email: email, userId: user?.uid, favorites: [] };
      await AsyncStorage.setItem("loggedInUser", JSON.stringify(userData));
      dispatch(setUserData(userData));

      console.log("Login successfull", user.email);
      setEmail("");
      setPassword("");
      navigation.navigate("HomeScreen" as never);
    } catch (error: any) {
      // Login failed
      const errorMessage = error.message;
      Alert.alert("Login failed", errorMessage);
    }
  };

  const handleRegister = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            userId: user?.uid,
            email: email,
            favorites: [],
          };

          // Add the user data to the Firestore collection
          const usersCollection = collection(FIREBASE_DB, "users");
          addDoc(usersCollection, userData)
            .then(() => {
              // Register successful
              Alert.alert("Register Successful");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setIsRegistering(!isRegistering);
            })
            .catch((error) => {
              // Error adding user data to Firestore collection
              console.error("Error adding user to collection:", error);
              Alert.alert("Register failed. Please try again.");
            });
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
