import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../firebase";
import {IMovie} from "../type/Movie";


export const addFavoriteToBase =  async (movie: IMovie) => {
    await setDoc(doc(db, "favorites", movie.id.toString()), {
        ...movie
    });
}

export const removeFavoriteToBase =  async (movie: IMovie) => {
    await deleteDoc(doc(db, "favorites", movie.id.toString()));
}