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

  return (
    <div>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error-message">Ошибка: {error}</p>}

      {accountFavorites.length > 0 ? (
        <ul className="favorite__movie-list">
          {accountFavorites.map((movie: Movie) => (
            <li key={movie.id} className="favorite__movie-list-item">
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