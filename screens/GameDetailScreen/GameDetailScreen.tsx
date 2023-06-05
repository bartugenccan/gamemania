import React, { useEffect, useState } from "react";
import { SafeAreaView, ImageBackground, ScrollView } from "react-native";
import { styles } from "./gamedetail.style";

// API
import ApiService from "../../services/ApiService";

// Types
import Game from "../../types/Game";
import Trailer from "../../types/Trailer";


// Navigation
import { useRoute } from "@react-navigation/native";

// Components
import BackButton from "../../common/BackButton";
import HeartButton from "../../common/HeartButton";
import Info from "../../components/GameDetail/Info/Info";

const GameDetailScreen: React.FC = () => {
  const route = useRoute();
  const { id } = route.params as { id: number };
  const [game, setGame] = useState<Game | null>(null);
  const [trailers, setTrailers] = useState<Trailer[]>([]);

  useEffect(() => {
    ApiService.fetchSingleGame(id.toString())
      .then((response) => {
        setGame(response);
      })
      .catch((error) => {
        console.log("Failed to fetch game:", error);
      });
  }, []);

  useEffect(() => {
    if (game) {
      ApiService.fetchSingleGameTrailer(id.toString())
        .then((response) => {
          setTrailers(response.results);
        })
        .catch((error) => {
          console.log("Failed to fetch game trailer:", error);
        });
    }
  }, [game]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ImageBackground
          source={{ uri: game?.background_image }}
          style={styles.image}
        >
          <BackButton />
          <HeartButton game={game} />
        </ImageBackground>
        <Info game={game} trailers={trailers} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameDetailScreen;
