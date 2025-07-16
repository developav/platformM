import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTop10Movies, setLoading, setError } from '../../slice/headMovieSlice';
import { useNavigate } from 'react-router-dom';
import './TopTen.scss';
import '../../index.css';

const Top10Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { top10Movies, loading, error } = useSelector((state: any) => state.movie);

  // Оптимизированная функция загрузки фильмов
  const fetchTop10Movies = useCallback(() => {
    if (top10Movies.length) return; // Если данные уже загружены, не делать повторный запрос

    dispatch(setLoading(true));
    dispatch(setError(null));

    fetch('https://cinemaguide.skillbox.cc/movie/top10')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке данных');
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setTop10Movies(data));
        dispatch(setError(null)); // Сброс ошибки, если запрос успешен
      })
      .catch((error) => {
        dispatch(setError(error.message || 'Произошла ошибка'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, top10Movies.length]);

  useEffect(() => {
    fetchTop10Movies();
  }, [fetchTop10Movies]);

  const handleMovieDetailsClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="container">
      <h2 className="movie__head">Топ-10 фильмов</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error-message">Ошибка: {error}</p>}

      {top10Movies.length > 0 ? (
        <ul className="movie-list">
          {top10Movies.map((movie: any, index: number) => (
            <li key={movie.id} className="movie-list__item">
              <div className="movie-list__item-count">{index + 1}</div>
              <img
                onClick={() => handleMovieDetailsClick(movie.id)}
                src={movie.posterUrl || '/placeholder.jpg'}
                alt={movie.title || 'Название недоступно'}
                className="movie-list__item-image"
              />
              
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>Фильмы не загружены</p>
      )}
    </div>
  );
};

export default Top10Movies;