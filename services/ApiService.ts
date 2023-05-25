import axios from "axios";
import Game from "../types/Game";

const API_KEY = "f7c9de79903b47dd9c6419160aecdeab";

const ApiService = {
  fetchGames: async () => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}`
      );

      if (response.status === 200) {
        return response.data.results;
      } else {
        throw new Error("Failed to fetch games.");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export default ApiService;
