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
import { useIsFocused } from "@react-navigation/native";

type TabName = "Home" | "Search" | "Profile";

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
  const getTabBarIcon = (isFocused: boolean, iconName: TabName | null) => {
    if (!iconName) {
      return null;
    }

    const activeColor = isFocused ? "black" : "gray";

    switch (iconName) {
      case "Home":
        return <Ionicons name="home-outline" size={24} color={activeColor} />;
      case "Search":
        return <Ionicons name="search-outline" size={24} color={activeColor} />;
      case "Profile":
        return <Ionicons name="person-outline" size={24} color={activeColor} />;
      default:
        return null;
    }
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          const isFocused = useIsFocused();

          let iconName: TabName | null = null;

          if (route.name === "Home") {
            iconName = "Home";
          } else if (route.name === "Search") {
            iconName = "Search";
          } else if (route.name === "Profile") {
            iconName = "Profile";
          }

          return getTabBarIcon(focused && isFocused, iconName);
        },
        tabBarActiveTintColor: "black",
        tabBarIconStyle: {
          width: 30,
          height: 30,
          alignSelf: "center",
          marginTop: 10,
        },
      })}
    >
      <Tab.Screen
        options={{ headerShown: false }}
        name="Home"
        component={HomeTab}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Search"
        component={SearchTab}
      />
      <Tab.Screen
        options={{ headerShown: false }}
        name="Profile"
        component={ProfileTab}
      />
    </Tab.Navigator>
  );
};

export default HomeScreen;
