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
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLoggedInUser = async () => {
    const userData = await AsyncStorage.getItem("loggedInUser");

    if (userData) {
      setIsLoggedIn(true);
      setIsLoading(false);
      const parsedUserData = JSON.parse(userData);
      console.log("User already logged in", parsedUserData);
    } else {
      setIsLoggedIn(false);
      console.log("User didn't log in");
    }
  };

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

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
