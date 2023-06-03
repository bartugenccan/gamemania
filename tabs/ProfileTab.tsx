import React, { useEffect } from "react";
import { View, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import Game from "../types/Game";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { FIREBASE_APP, FIREBASE_AUTH } from "../firebaseConfig";
import { clearUserData } from "../store/userSlice";

const ProfileTab: React.FC = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = React.useState<Game[]>([]);
  const db = getFirestore(FIREBASE_APP);
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();

  const fetchFavorites = async () => {
    const q = query(
      collection(db, "users"),
      where("userId", "==", userData.userId)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const favoritesArray = doc.data().favorites || [];
      setFavorites(favoritesArray);
    });
  };

  useEffect(() => {
    fetchFavorites();
  }, [userData.userId, favorites]);

  const handleLogout = async () => {
    // Firebase'den çıkış yap
    const auth = getAuth();
    await signOut(auth);

    // AsyncStorage'deki oturum bilgilerini temizle
    await AsyncStorage.removeItem("loggedInUser");

    dispatch(clearUserData());

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
