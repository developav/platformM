import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setAccountFavorites, setLoading, setError } from '../slice/headMovieSlice';


export const useFetchAccountFavorites = () => {

  const dispatch = useDispatch();
  const fetchAccountFavorites = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    fetch("https://cinemaguide.skillbox.cc/favorites", {
      method: "GET",
      credentials: "include",
      headers: {
        "Authorization": "frontdeveloper",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) throw new Error("Ошибка загрузки избранного");
        return response.json();
      })
      .then((data) => {
        dispatch(setAccountFavorites(data));
      })
      .catch((error) => {
        dispatch(setError(error.message || "Произошла ошибка"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);
 return fetchAccountFavorites
}