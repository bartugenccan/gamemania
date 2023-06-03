import React, { useState } from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToFavorites, removeFromFavorites } from "../store/favoritesSlice";
import { RootState } from "../store";
import Game from "../types/Game";

interface HeartButtonProps {
  game: Game | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({ game }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.favorites.favorites);
  const isFavorite = favorites.some((favorite) => favorite.id === game?.id);

  const handleToggleFavorite = () => {
    if (isFavorite && game) {
      dispatch(removeFromFavorites(game.id));
    } else {
      dispatch(addToFavorites(game!));
    }
  };

  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.7} onPress={handleToggleFavorite}>
      <Ionicons
        name={isFavorite ? "heart" : "heart-outline"}
        size={24}
        color={isFavorite ? "red" : "white"}
      />
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
