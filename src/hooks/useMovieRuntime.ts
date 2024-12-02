import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export const useMovieRuntime = (movie_id: number) => {
    const [runtime, setRuntime] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(collection(db, "movies_runtime"), where("movie_id", "==", movie_id));

        // Подписываемся на изменения в коллекции
        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                if (!querySnapshot.empty) {
                    const docData = querySnapshot.docs[0].data();
                    setRuntime(docData.already_watched_time || null); // Устанавливаем значение или null
                } else {
                    setRuntime(null); // Если данных нет, устанавливаем null
                }
                setLoading(false); // Заканчиваем загрузку
            },
            (err) => {
                setError("Failed to fetch runtime");
                console.error("Error fetching runtime:", err);
                setLoading(false); // Заканчиваем загрузку при ошибке
            }
        );

        // Возвращаем функцию для отписки от слушателя
        return () => unsubscribe();

    }, [movie_id]); // Перезапускаем хук при изменении movie_id

    return { watched_time: runtime, loading, error };
};
