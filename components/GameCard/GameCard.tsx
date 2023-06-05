import {Image, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Types
import Game from "../../types/Game";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("GameDetail" as never, { id: game.id } as never);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image style={styles.image} source={{ uri: game.background_image }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 150,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default GameCard;
