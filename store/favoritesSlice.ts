import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Game from "../types/Game";

interface FavoritesState {
  favorites: Game[]; // game ids
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Game>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const gameId = action.payload;
      state.favorites = state.favorites.filter((game) => game.id !== gameId);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
