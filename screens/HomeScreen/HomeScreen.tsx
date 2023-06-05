import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

// Components
import HomeTab from "../../tabs/HomeTab/HomeTab";
import ProfileTab from "../../tabs/ProfileTab/ProfileTab";
import SearchTab from "../../tabs/SearchTab/SearchTab";
import GameDetailScreen from "../GameDetailScreen/GameDetailScreen";

// Icons
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeScreen: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeStack"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameDetail"
        component={GameDetailScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="home-outline" size={24} color="black" />
          ),
          tabBarActiveTintColor: "#000",
          title: "",
          tabBarIconStyle: {
            width: 30,
            height: 30,
            alignSelf: "center",
            marginTop: 10,
          },
        }}
        name="HomeTab"
        component={HomeTab}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => <Ionicons name="search-outline" size={24} color="black" />,
          tabBarActiveTintColor: "#000",
          title: "",
          tabBarIconStyle: {
            width: 30,
            height: 30,
            alignSelf: "center",
            marginTop: 10,
          },
        }}
        name="SearchTab"
        component={SearchTab}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: () => (
            <Ionicons name="person-outline" size={24} color="black" />
          ),
          tabBarActiveTintColor: "#000",
          title: "",
          tabBarIconStyle: {
            width: 30,
            height: 30,
            alignSelf: "center",
            marginTop: 10,
          },
        }}
        name="ProfileTab"
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
