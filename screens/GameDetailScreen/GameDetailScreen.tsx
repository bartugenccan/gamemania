import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { useRoute } from "@react-navigation/native";
import ApiService from "../../services/ApiService";
import Game from "../../types/Game";

const GameDetailScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    ApiService.fetchSingleGame(id.toString())
      .then((response) => {
        setGame(response);
      })
      .catch((error) => {
        console.log("Failed to fetch game:", error);
      });
  });

  return (
    <View style={{ alignItems: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{game?.name}</Text>
      <Image
        source={{ uri: game?.background_image }}
        style={{ height: 240, width: 230 }}
      />
    </View>
  );
};

export default GameDetailScreen;
