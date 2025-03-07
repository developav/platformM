import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTop10Movies, setLoading, setError } from '../../slice/headMovieSlice';
import { useNavigate } from 'react-router-dom';
import './TopTen.scss'; // Подключаем стили для карточек
import '../../index.css'

const Top10Movies = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { top10Movies, loading, error } = useSelector((state: any) => state.movie);

  // Получаем топ-10 фильмов
  const fetchTop10Movies = () => {
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
      })
      .catch((error) => {
        dispatch(setError(error.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };

  useEffect(() => {
    fetchTop10Movies();
  }, []);

  const handleMovieDetailsClick = (movieId: string) => {
    navigate(`/movie-details/${movieId}`); // Переход на страницу с деталями фильма
  };

  return (
    <div className="container">
      <h2>Топ-10 фильмов</h2>
      {loading && <p>Загрузка...</p>}
      {error && <p>Ошибка: {error}</p>}
      <ul className="movie-list">
        {top10Movies.length > 0 ? (
          top10Movies.map((movie: any, index) => (
            <li key={movie.id} className="movie-list__item">
              <img  onClick={() => handleMovieDetailsClick(movie.id)} src={movie.posterUrl} alt={movie.title} className="movie-list__item-image" />
              <span className="movie-list__item-count">{index + 1}</span>
            </li>
          ))
        ) : (
          <p>Фильмы не загружены</p>
        )}
      </ul>
    </div>
  );
};

export default Top10Movies;