import React, { useEffect } from "react";
import { View, Button, Text, FlatList, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

// Types
import Game from "../../types/Game";

// Redux
import { clearUserData } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

// Firebase
import { getAuth, signOut } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { FIREBASE_APP } from "../../firebaseConfig";
import GameCard from "../../components/GameCard/GameCard";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileTab: React.FC = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = React.useState<Game[]>([]);
  const db = getFirestore(FIREBASE_APP);
  const userData = useSelector((state: any) => state.user.userData);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!userData || !userData.userId) {
        setFavorites([]);
        return;
      }

      const q = query(
        collection(db, "users"),
        where("userId", "==", userData.userId)
      );
      const querySnapshot = await getDocs(q);
      const favoritesArray: any[] | ((prevState: Game[]) => Game[]) = [];
      querySnapshot.forEach((doc) => {
        const favoritesData = doc.data().favorites || [];
        favoritesArray.push(...favoritesData);
      });
      setFavorites(favoritesArray);
    };

    fetchFavorites();
  }, [favorites]);

  // Rendering Game Card In Flatlist
  const renderGameCard = ({ item: game }: { item: Game }) => {
    return <GameCard game={game} />;
  };

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
    <SafeAreaView
      style={{
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        backgroundColor: "#000000",
        width: "100%",
      }}
    >
      <TouchableOpacity
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1,
          backgroundColor: "gray",
          padding: 10,
          borderRadius: 50,
        }}
        onPress={handleLogout}
      >
        <Text style={{ color: "#FFFFFF" }}>Logout</Text>
      </TouchableOpacity>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#FFFFFF" }}>Favorites:</Text>
        <FlatList
          data={favorites}
          horizontal
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGameCard}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProfileTab;
