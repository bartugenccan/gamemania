import {
  arrayRemove,
  arrayUnion,
  collection,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FIREBASE_APP } from "./firebaseConfig";
import Game from "./types/Game";

const db = getFirestore(FIREBASE_APP);

export const handleToggleFavorite = async (userId: string, game: Game) => {
    const q = query(collection(db, "users"), where("userId", "==", userId));
  
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(async (doc) => {
      const userRef = doc.ref;
      const favoritesArray = doc.data().favorites || [];
      const isFavorite = favoritesArray.some((favGame: Game) => favGame.id === game.id);
  
      let updatedFavoritesArray = favoritesArray;
      if (isFavorite) {
        updatedFavoritesArray = favoritesArray.filter((favGame: Game) => favGame.id !== game.id);
        console.log('Game removed from favorites:', game.name);
      } else {
        updatedFavoritesArray.push(game);
        console.log('Game added to favorites:', game.name);
      }
  
      await updateDoc(userRef, { favorites: updatedFavoritesArray });
    });
  };