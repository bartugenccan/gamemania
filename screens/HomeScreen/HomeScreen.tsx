import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import GameList from "../../components/GameList/GameList";
import SearchScreen from "../SearchScreen/SearchScreen";
import ProfileScreen from "../ProfileScreen/ProfileScreen";

const Tab = createBottomTabNavigator();
const HomeScreen: React.FC = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="GameList" component={GameList} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
