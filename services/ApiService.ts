import axios from "axios";

const API_KEY = "ff9f355654984a3c9f192f49ef506400";

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

  fetchSingleGame: async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch game.");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  fetchSingleGameTrailer: async (id: string) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error("Failed to fetch game trailer.");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  fetchSearchedGames: async (searchQuery: string) => {
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(
          searchQuery
        )}`
      );

      if (response.status === 200) {
        return response.data.results;
      } else {
        throw new Error("Failed to fetch searched games.");
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  },
};

export default ApiService;
