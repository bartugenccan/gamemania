import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    marginTop: 20,
    marginHorizontal: 16,
  },
  titleFav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  gameTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
  },
  ratingArea: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  trailerButton: {
    width: "80%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "darkgray",
    alignSelf: "center",
    borderRadius: 20,
    marginTop: 28,
  },
  descriptionArea: {
    marginTop: 20,
  },
});
