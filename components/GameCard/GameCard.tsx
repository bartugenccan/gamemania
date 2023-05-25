import { Text, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Game from "../../types/Game";

interface GameCardProps {
  game: Game;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  return (
    <TouchableOpacity style={styles.container}>
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
