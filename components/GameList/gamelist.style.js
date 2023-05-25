import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000000",
  },
  randomGameImage: {
    width: "100%",
    height: 400,
  },
  linearGradient: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end",
  },
  genreContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  genreText: {
    marginRight: 10,
    fontSize: 16,
    color: "gray",
  },
});

export default styles;
