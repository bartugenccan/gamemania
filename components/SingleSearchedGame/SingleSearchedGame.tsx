import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// Types
import Game from "../../types/Game";

// Navigation
import { useNavigation } from "@react-navigation/native";

type SingleSearchedGameProps = {
  game: Game;
};

const SingleSearchedGame: React.FC<SingleSearchedGameProps> = ({ game }) => {
  const { name, metacritic } = game;
  const navigation = useNavigation();

  const getScoreCircleStyle = (score: number | undefined) => {
    if (score !== undefined) {
      if (score >= 80) {
        return {
          backgroundColor: "green",
        };
      } else if (score >= 50) {
        return {
          backgroundColor: "orange",
        };
      } else {
        return {
          backgroundColor: "white",
        };
      }
    } else {
      return {
        backgroundColor: "gray",
      };
    }
  };

  const renderScoreText = (score: number | undefined) => {
    if (score !== undefined) {
      return score;
    } else {
      return "N/A";
    }
  };

  const handleGamePress = () => {
    navigation.navigate("GameDetail" as never, { id: game.id } as never);
  };

  return (
    <TouchableOpacity onPress={handleGamePress}>
      <View style={styles.container}>
        <Text style={styles.gameName}>{name}</Text>
        <View style={[styles.scoreCircle, getScoreCircleStyle(metacritic)]}>
          <Text style={styles.scoreText}>{renderScoreText(metacritic)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  gameName: {
    flex: 1,
    color: "black",
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  scoreCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginVertical: 10,
  },
  scoreText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SingleSearchedGame;
