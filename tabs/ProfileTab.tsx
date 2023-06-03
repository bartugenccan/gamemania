import React from "react";
import { View, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Game from "../types/Game";

const ProfileTab: React.FC = () => {
  const navigation = useNavigation();

  const favorites: Game[] = useSelector(
    (state: RootState) => state.favorites.favorites
  );

  const handleLogout = async () => {
    // Firebase'den çıkış yap
    const auth = getAuth();
    await signOut(auth);

    // AsyncStorage'deki oturum bilgilerini temizle
    await AsyncStorage.removeItem("loggedInUser");

    // Giriş ekranına yönlendir
    navigation.navigate("Login" as never);
  };
  return (
    <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
      <Button title="Logout" onPress={handleLogout} />
      <Text>Favorites:</Text>
      {favorites.map((game) => (
        <Text key={game.id}>{game.name}</Text>
      ))}
    </View>
  );
};

export default ProfileTab;
