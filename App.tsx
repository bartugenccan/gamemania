import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Navigation
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// Components
import HomeScreen from "./screens/HomeScreen/HomeScreen";
import LoginScreen from "./screens/LoginScreen/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen/LoadingScreen";

// Redux
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, RootState } from "./store";
import { setUserData } from "./store/userSlice";

const Stack = createStackNavigator();

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userData = useSelector((state: RootState) => state.user.userData);

  useEffect(() => {
    const checkLoggedInUser = async () => {
      const storedUser = await AsyncStorage.getItem("loggedInUser");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch(setUserData(parsedUser));
      }
      setIsLoading(false);
    };

    checkLoggedInUser();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {userData ? (
          <>
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RootApp: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default RootApp;
