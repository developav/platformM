import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Movie } from '../../types/movie';
import { setAccountFavorites, setLoading, setError } from '../../slice/headMovieSlice';
import { useNavigate } from 'react-router-dom';
import './AccountFavorites.scss';


const AccountFavorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountFavorites = [], loading, error } = useSelector((state: any) => state.movie);

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
      .then((data: Movie[]) => {
        dispatch(setAccountFavorites(data));
      })
      .catch((error) => {
        dispatch(setError(error.message || "Произошла ошибка"));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    fetchAccountFavorites();
  }, [fetchAccountFavorites]);


  const handleMovieDetailsClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handleRemove = (movieId: number) => {
  fetch(`https://cinemaguide.skillbox.cc/favorites/${movieId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Authorization": "frontdeveloper",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) throw new Error("Не удалось удалить из избранного");
      dispatch(setAccountFavorites(accountFavorites.filter((m: Movie) => m.id !== movieId)));
    })
    .catch((err) => {
      dispatch(setError(err.message));
    });
};

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error-message">Ошибка: {error}</p>}

      {accountFavorites.length > 0 ? (
        <ul className="favorite__movie-list">
          {accountFavorites.map((movie: Movie) => (
            <li key={movie.id} className="favorite__movie-list-item">
              <div className="favorite__overlay">
                <button className="favorite__remove-btn" onClick={() => handleRemove(movie.id)}>
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="40" height="40" rx="20" fill="white"/>
                    <path d="M19.9987 18.5865L24.9485 13.6367L26.3627 15.0509L21.4129 20.0007L26.3627 24.9504L24.9485 26.3646L19.9987 21.4149L15.049 26.3646L13.6348 24.9504L18.5845 20.0007L13.6348 15.0509L15.049 13.6367L19.9987 18.5865Z" fill="black"/>
                  </svg>
                </button>
              </div>
              <img
                onClick={() => handleMovieDetailsClick(movie.id)}
                src={movie.posterUrl || "/placeholder.jpg"}
                alt={movie.title}
                className="favorite__movie-list-image"
              />
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>У вас пока нет избранных фильмов</p>
      )}
    </div>
  );
};

export default AccountFavorites;