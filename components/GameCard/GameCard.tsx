import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

// Navigation
import { useNavigation } from "@react-navigation/native";

// Types
import Game from "../../types/Game";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  const handlePress = () => {
    navigation.navigate("GameDetail" as never, { id: game.id } as never);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#FFFFFF" />
        </View>
      )}
      <Image
        style={styles.image}
        source={{ uri: game.background_image }}
        onLoad={handleImageLoad}
      />
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
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
  },
});

export default GameCard;
