import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../firebase";
import {IMovie} from "../type/Movie";


export const addFavoriteToBase =  async (movie: IMovie) => {
    await setDoc(doc(db, "favorites", movie.id.toString()), {
        ...movie
    });
}

export const removeFavoriteToBase =  async (id: number) => {
    await deleteDoc(doc(db, "favorites", id.toString()));
}

export const addWatchToBase =  async (movie: IMovie) => {
    await setDoc(doc(db, "watch_later", movie.id.toString()), {
        ...movie
    });
}

export const removeWatchToBase =  async (id: number) => {
    await deleteDoc(doc(db, "watch_later", id.toString()));
}