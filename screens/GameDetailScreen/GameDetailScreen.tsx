import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import ApiService from "../../services/ApiService";
import Game from "../../types/Game";
import { styles } from "./gamedetail.style";
import { useNavigation } from "@react-navigation/native";
import Info from "../../components/GameDetail/Info/Info";
import Trailer from "../../types/Trailer";
import { ScrollView } from "react-native-gesture-handler";
import BackButton from "../../common/BackButton";
import HeartButton from "../../common/HeartButton";

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
          <HeartButton />
        </ImageBackground>
        <Info game={game} trailers={trailers} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GameDetailScreen;
