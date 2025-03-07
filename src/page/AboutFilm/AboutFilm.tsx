import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMovie, setMovieDetails, setLoading, setError } from '../store/movieSlice'; // Импортируем действия
import { useTranslation } from "react-i18next";
import './headPage.scss';

const RandomMovie = () => {
  const dispatch = useDispatch();
  const { movie, movieDetails, loading, error } = useSelector((state) => state.movie); // Получаем данные из Redux
  const { t } = useTranslation();

  // Запрос случайного фильма
  const fetchMovie = () => {
    dispatch(setLoading(true)); // Устанавливаем loading
    dispatch(setError(null));    // Сбрасываем ошибки

    fetch('https://cinemaguide.skillbox.cc/movie/random')
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setMovie(data)); // Сохраняем фильм в store
      })
      .catch((error) => {
        dispatch(setError(error.message)); // Сохраняем ошибку в store
      })
      .finally(() => {
        dispatch(setLoading(false)); // Устанавливаем loading в false
      });
  };

  // Запрос данных о фильме по id
  const fetchMovieDetails = (movieId) => {
    dispatch(setLoading(true)); // Устанавливаем loading
    dispatch(setError(null));    // Сбрасываем ошибки

    fetch(`https://cinemaguide.skillbox.cc/movie/${movieId}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Ошибка при загрузке данных");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(setMovieDetails(data)); // Сохраняем детали фильма в store
      })
      .catch((error) => {
        dispatch(setError(error.message)); // Сохраняем ошибку в store
      })
      .finally(() => {
        dispatch(setLoading(false)); // Устанавливаем loading в false
      });
  };

  useEffect(() => {
    fetchMovie(); // Загружаем случайный фильм при монтировании компонента
  }, []);

  const formatRuntime = (minutes) => {
    if (!minutes || minutes <= 0) return "Неизвестно";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins} мин`;
  };

  return (
    <div className="container">
      {movie && (
        <div>
          <div className="home__container">
            <div className="grid__home-group">
              <div className="home__group-charact">
                <div
                  className="home__raiting"
                  style={{
                    backgroundColor: movie.tmdbRating < 6 ? "#A59400" : "#C82020",
                    borderRadius: "10px",
                    transition: "background-color 0.5s ease",
                  }}
                >
                  <svg
                    width="16"
                    height="15"
                    viewBox="0 0 16 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z"
                      fill="white"
                    />
                  </svg>
                  {movie.tmdbRating}
                </div>
                <span className="home__year"> {movie.releaseYear} </span>
                <span className="home__genre">
                  {" "}
                  {movie.genres
                    ? movie.genres
                        .map((genre) => t(`genres.${genre.toLowerCase()}`))
                        .join(", ")
                    : "Нет жанров"}
                </span>
                <span className="home__runtime">
                  {" "}
                  {formatRuntime(movie.runtime)}
                </span>
              </div>
              <div className="home__group-title">
                <h1 className="home__head-title"> {movie.title}</h1>
                <p className="home__description"> {movie.plot}</p>
              </div>
              <div className="home__group-button">
                {movie.trailerUrl && (
                  <a
                    className="home__play"
                    href={movie.trailerUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Трейлер
                  </a>
                )}
                <a
                  href="#"
                  className="home__about"
                  onClick={() => fetchMovieDetails(movie.id)} // При клике загружаем детали фильма
                >
                  О фильме
                </a>
                <a href="#" className="home__favorites">
                  {/* Иконка избранного */}
                </a>
                <a
                  className="home__refresh"
                  onClick={fetchMovie}
                  disabled={loading}
                >
                  {/* Иконка обновления */}
                </a>
              </div>
            </div>
            <div className="home__group-img">
              {movie.posterUrl ? (
                <img src={movie.posterUrl} alt={movie.title} />
              ) : (
                <p>Изображение отсутствует</p>
              )}
            </div>
          </div>

          {movieDetails && (
            <div className="movie-details">
              <h2>{movieDetails.title}</h2>
              <p><strong>Описание:</strong> {movieDetails.plot}</p>
              <p><strong>Год выпуска:</strong> {movieDetails.releaseYear}</p>
              <p><strong>Жанры:</strong> {movieDetails.genres.join(', ')}</p>
              <p><strong>Рейтинг:</strong> {movieDetails.tmdbRating}</p>
              {/* Добавьте другие поля, которые хотите отобразить */}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RandomMovie;