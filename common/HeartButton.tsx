import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { handleToggleFavorite } from "../firebaseUtils";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FIREBASE_DB } from "../firebaseConfig";
import Game from "../types/Game";

interface HeartButtonProps {
  game: Game | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ game }) => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [isInFavorites, setIsInFavorites] = useState(false);
  const [heartIcon, setHeartIcon] = useState<"heart" | "heart-outline">(
    "heart-outline"
  );
  const [heartColor, setHeartColor] = useState<"red" | "white">("white");

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!game || !userData) return;

      const q = query(
        collection(FIREBASE_DB, "users"),
        where("userId", "==", userData.userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        const favoritesArray = doc.data().favorites || [];
        const isFavorite = favoritesArray.some(
          (favGame: Game) => favGame.id === game.id
        );

        setIsInFavorites(isFavorite);
        setHeartColor(isFavorite ? "red" : "white");
        setHeartIcon(isFavorite ? "heart" : "heart-outline");
      });
    };

    fetchFavorites();
  }, [game, userData]);

  const handleToggle = async () => {
    if (game) {
      await handleToggleFavorite(userData?.userId!, game);
      setIsInFavorites((prevIsInFavorites) => !prevIsInFavorites);
      setHeartColor((prevHeartColor) =>
        prevHeartColor === "red" ? "white" : "red"
      );
      setHeartIcon((prevHeartIcon) =>
        prevHeartIcon === "heart" ? "heart-outline" : "heart"
      );
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={handleToggle}
    >
      <Ionicons name={heartIcon} size={24} color={heartColor} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 10,
    right: 20,
    zIndex: 1,
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 50,
  },
});

export default HeartButton;
