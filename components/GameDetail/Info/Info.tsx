import React from "react";
import { Text, View, TouchableOpacity, Linking, Alert } from "react-native";
import Game from "../../../types/Game";
import { styles } from "./info.style";
import Trailer from "../../../types/Trailer";

type InfoProps = {
  game: Game | null;
  trailers: Trailer[];
};

const Info: React.FC<InfoProps> = ({ game, trailers }) => {
  const handleTrailer = () => {
    if (trailers && trailers.length > 0) {
      Linking.openURL(trailers[0]?.data?.max);
    } else {
      Alert.alert("No trailer found!");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleFav}>
        <Text style={styles.gameTitle}>{game?.name}</Text>
      </View>
      <Text
        style={{
          color: "gray",
          fontWeight: "bold",
          fontSize: 16,
          marginTop: 12,
        }}
      >
        Released: {game?.released}
      </Text>
      <View style={styles.ratingArea}>
        <Text style={{ color: "gray", fontWeight: "bold", fontSize: 16 }}>
          Metacritic:
        </Text>
        <View
          style={{
            backgroundColor: "green",
            borderRadius: 50,
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 12,
          }}
        >
          <Text style={{ color: "white" }}>{game?.metacritic}</Text>
        </View>
        <Text
          style={{
            color: "gray",
            fontWeight: "bold",
            marginLeft: 12,
            fontSize: 16,
          }}
        >
          Playtime:
        </Text>
        <View
          style={{
            backgroundColor: "blue",
            borderRadius: 50,
            width: 30,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            marginLeft: 12,
          }}
        >
          <Text style={{ color: "white" }}>{game?.playtime}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.trailerButton} onPress={handleTrailer}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          Trailer
        </Text>
      </TouchableOpacity>
      <View style={styles.descriptionArea}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 22 }}>
          Description
        </Text>
        <Text style={{ color: "gray", fontSize: 16, marginTop: 12 }}>
          {game?.description_raw}
        </Text>
      </View>
    </View>
  );
};

export default Info;
