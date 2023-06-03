import React, { useEffect, useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import Game from "../types/Game";
import { handleToggleFavorite } from "../firebaseUtils";
import { RootState } from "../store";

interface HeartButtonProps {
  game: Game | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ game }) => {
  const userData = useSelector((state: RootState) => state.user.userData);
  const [isInFavorites, setIsInFavorites] = useState(false);

  useEffect(() => {
    const checkIfGameIsInFavorites = () => {
      if (userData && game) {
        const exists = userData.favorites.some(
          (favoriteGame) => favoriteGame.id === game.id
        );
        setIsInFavorites(exists);
      }
    };

    checkIfGameIsInFavorites();
  }, [userData, game]);

  const heartIcon = isInFavorites ? "heart" : "heart-outline";
  const heartColor = isInFavorites ? "red" : "white";

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onPress={() => handleToggleFavorite(userData?.userId!, game!)}
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
