import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAccountFavorites, setLoading, setError } from '../../slice/headMovieSlice';
import { useNavigate } from 'react-router-dom';
import '../topTen/TopTen.scss';
import { Movie } from '../../types/movie';
import '../../index.css';

const AccountFavorites = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountFavorites = [], loading, error } = useSelector((state: any) => state.movie);

  const fetchAccountFavorites = useCallback(() => {
    if (accountFavorites.length > 0) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    fetch('https://cinemaguide.skillbox.cc/favorites')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then((data: Movie[]) => {
        dispatch(setAccountFavorites(data));
      })
      .catch((error) => {
        dispatch(setError(error.message || 'Произошла ошибка'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, accountFavorites]);

  useEffect(() => {
    fetchAccountFavorites();
  }, [fetchAccountFavorites]);

  const handleMovieDetailsClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container">
      <h2 className="movie__head">Избранные фильмы</h2>

      {loading && <p>Загрузка...</p>}
      {error && <p className="error-message">Ошибка: {error}</p>}

      {accountFavorites.length > 0 ? (
        <ul className="movie-list">
          {accountFavorites.map((movie: Movie, index: number) => (
            <li key={movie.id} className="movie-list__item">
              <div className="movie-list__item-count">{index + 1}</div>

              <img
                onClick={() => handleMovieDetailsClick(movie.id)}
                src={movie.posterUrl || '/placeholder.jpg'}
                alt={movie.title}
                className="movie-list__item-image"
              />

              <div className="movie-list__item-title">{movie.title}</div>
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