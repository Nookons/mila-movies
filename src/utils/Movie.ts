import { arrayRemove, arrayUnion, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { IMovie } from "../type/Movie";
import { IFirebaseUser } from "../type/User";
import dayjs from "dayjs";

const updateMovieList = async (collection: string, movie: IMovie, user: IFirebaseUser | null, action: 'add' | 'remove') => {
    if (!user) return

    const userRef = doc(db, collection, user.uid);
    const movieId = movie.id;

    try {
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const updateAction = action === 'add' ? arrayUnion(movieId) : arrayRemove(movieId);
            await updateDoc(userRef, {
                list: updateAction,
                update_date: dayjs().valueOf(),
                user: user.uid
            });
        } else if (action === 'add') {
            await setDoc(userRef, {
                list: [movieId],
                update_date: dayjs().valueOf(),
                user: user.uid
            });
        }
    } catch (error) {
        console.error(`Error updating ${collection} for user ${user.uid}:`, error);
    }
};

export const addFavoriteToBase = (movie: IMovie, user: IFirebaseUser | null) => {
    return updateMovieList('favorites', movie, user, 'add');
};

export const removeFavoriteToBase = (movie: IMovie, user: IFirebaseUser | null) => {
    return updateMovieList('favorites', movie, user, 'remove');
};

export const addWatchToBase = (movie: IMovie, user: IFirebaseUser | null) => {
    return updateMovieList('watch_later', movie, user, 'add');
};

export const removeWatchToBase = (movie: IMovie, user: IFirebaseUser | null) => {
    return updateMovieList('watch_later', movie, user, 'remove');
};

export const addWatchedToBase = async (movie: IMovie, user: IFirebaseUser | null) => {
    if (user) {
        await updateMovieList('watched', movie, user, 'add');
        await updateMovieList('watch_later', movie, user, 'remove');
    }
};

export const removeWatchedToBase = (movie: IMovie, user: IFirebaseUser | null) => {
    return updateMovieList('watched', movie, user, 'remove');
};
