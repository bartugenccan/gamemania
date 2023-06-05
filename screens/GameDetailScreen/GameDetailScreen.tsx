import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
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
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true); // Start loading

    ApiService.fetchSingleGame(id.toString())
      .then((response) => {
        setGame(response);
        setIsLoading(false); // Stop loading
      })
      .catch((error) => {
        console.log("Failed to fetch game:", error);
        setIsLoading(false); // Stop loading
      });
  }, []);

  useEffect(() => {
    if (game) {
      setIsLoading(true); // Start loading

      ApiService.fetchSingleGameTrailer(id.toString())
        .then((response) => {
          setTrailers(response.results);
          setIsLoading(false); // Stop loading
        })
        .catch((error) => {
          console.log("Failed to fetch game trailer:", error);
          setIsLoading(false); // Stop loading
        });
    }
  }, [game]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {isLoading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <ImageBackground
            source={{ uri: game?.background_image }}
            style={styles.image}
          >
            <BackButton />
            <HeartButton game={game} />
          </ImageBackground>
        )}
        {!isLoading && <Info game={game} trailers={trailers} />}
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameDetailScreen;
