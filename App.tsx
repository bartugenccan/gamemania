import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import ApiService from "./services/ApiService";
import Game from "./types/Game";

export default function App() {
  useEffect(() => {
    ApiService.fetchGames()
      .then((games: Game[]) => {
        const gameNames = games.map((game: Game) => game.name);
        console.log("Games:", gameNames);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });

  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
