interface Genre {
  name: string;
}

interface Game {
  id: number;
  name: string;
  background_image: string;
  rating: number;
  metacritic: number;
  genres: Genre[];
  playtime: number;
  released: string;
}

export default Game;
