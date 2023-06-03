import Game from "./Game";

interface User {
    userId: string;
    email: string;
    favorites: Game[]
}

export default User;