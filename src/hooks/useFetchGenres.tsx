import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setGenreMovies, setLoading, setError } from "../slice/headMovieSlice";

export const useFetchGenres = () => {
  const dispatch = useDispatch();
  const token = "frontdeveloper";

  const fetchGenres = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    fetch("https://cinemaguide.skillbox.cc/movie/genres", {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке жанров");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setGenreMovies(data));
      })
      .catch((error) => {
        dispatch(setError(error.message || "Произошла ошибка"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, token]);

  return fetchGenres;
};