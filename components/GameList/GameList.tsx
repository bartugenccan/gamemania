import { useEffect, useState } from "react";
import { Text, ImageBackground, View, FlatList } from "react-native";
import ApiService from "../../services/ApiService";
import Game from "../../types/Game";
import styles from "./gamelist.style";
import { LinearGradient } from "expo-linear-gradient";
import { Button } from "@rneui/themed";
import GameCard from "../GameCard/GameCard";
import { ScrollView } from "react-native";

const GameList: React.FC = () => {
  const [randomGame, setRandomGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  const [groupedGames, setGroupedGames] = useState<{ [genre: string]: Game[] }>(
    {}
  );

  useEffect(() => {
    // Fetching All Games
    ApiService.fetchGames()
      .then((response) => {
        setGames(response);
        setGroupedGames(groupGamesByGenre(response));

        // Updating random game state
        const randomIndex = Math.floor(Math.random() * response.length);
        setRandomGame(response[randomIndex]);
      })
      .catch((error) => {
        console.log("Failed to fetch games:", error);
      });
  }, []);

  // Group games by genre
  const groupGamesByGenre = (games: Game[]): { [genre: string]: Game[] } => {
    const groupedGames: { [genre: string]: Game[] } = {};

    for (const game of games) {
      const genres = game.genres;
      for (const genre of genres) {
        if (groupedGames[genre.name]) {
          groupedGames[genre.name].push(game);
        } else {
          groupedGames[genre.name] = [game];
        }
      }
    }

    return groupedGames;
  };

  // Rendering Game Card In Flatlist
  const renderGameCard = ({ item: game }: { item: Game }) => {
    return <GameCard game={game} />;
  };

  return (
    <ScrollView style={styles.container}>
      <ImageBackground
        imageStyle={{ borderRadius: 10 }}
        style={styles.randomGameImage}
        source={{ uri: randomGame?.background_image }}
      >
        <LinearGradient
          colors={["#00000000", "#000000"]}
          style={styles.linearGradient}
        >
          <Button
            title="Game Details"
            type="outline"
            titleStyle={{ color: "gray", fontWeight: "bold" }}
            containerStyle={{ width: 100, alignSelf: "center" }}
            buttonStyle={{ borderColor: "gray", borderRadius: 10 }}
          />
        </LinearGradient>
      </ImageBackground>

      {Object.keys(groupedGames).map((genre) => (
        <View key={genre} style={{ marginTop: 24 }}>
          <Text
            style={{
              color: "white",
              fontWeight: "bold",
              fontSize: 25,
              marginBottom: 12,
            }}
          >
            {genre}
          </Text>
          <FlatList
            horizontal
            data={groupedGames[genre]}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderGameCard}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default GameList;
