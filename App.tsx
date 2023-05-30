import { StyleSheet, Text, View, FlatList } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import SearchScreen from "./screens/SearchScreen/SearchScreen";
import ProfileScreen from "./screens/ProfileScreen/ProfileScreen";
import React, { useEffect, useState } from "react";
import GameDetailScreen from "./screens/GameDetailScreen/GameDetailScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(true);

  const checkLoggedInUser = async () => {
    const userData = await AsyncStorage.getItem("loggedInUser");

    if (userData) {
      setIsLoggedIn(true);
      setShowLoginScreen(false);
      const parsedUserData = JSON.parse(userData);
      console.log("User already logged in", parsedUserData);
    } else {
      console.log("User didn't log in");
    }
  };

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name="GameList"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GameDetail"
            component={GameDetailScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <LoginScreen />
      )}
    </NavigationContainer>
  );
};

export default App;
