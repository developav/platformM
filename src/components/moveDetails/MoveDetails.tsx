import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setMovieDetails, setLoading, setError } from '../../slice/headMovieSlice';
import { useTranslation } from "react-i18next";
import '../main/main.scss';
import './MoveDetails.scss'

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { movieDetails, loading, error } = useTypedSelector((state) => state.movie);
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<{ favorites?: string[] }>({});
  const [isFavorite, setIsFavorite] = useState(false);

  const yourToken = "frontdeveloper";

  // Получение данных пользователя
  useEffect(() => {
    fetch("https://cinemaguide.skillbox.cc/profile", {
      method: "GET",
      credentials: "include",
      headers: { "Authorization": `Bearer ${yourToken}`, "Content-Type": "application/json" },
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .catch(err => console.error("Ошибка загрузки профиля:", err));
  }, []);

  // Получение данных фильма
  useEffect(() => {
    if (!id) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    fetch(`https://cinemaguide.skillbox.cc/movie/${id}`, {
      method: "GET",
      credentials: "include",
      headers: { "Authorization": `Bearer ${yourToken}`, "Content-Type": "application/json" },
    })
      .then(res => {
        if (!res.ok) throw new Error(`Ошибка запроса: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (data && data.title) {
          dispatch(setMovieDetails(data));
        } else {
          dispatch(setError("Фильм не найден"));
        }
      })
      .catch(err => dispatch(setError(err.message)))
      .finally(() => dispatch(setLoading(false)));
  }, [id, dispatch]);

  // Проверка, находится ли фильм в избранном
  useEffect(() => {
    if (movieDetails?.id && userData.favorites?.includes(String(movieDetails.id))) {
      setIsFavorite(true);
    }
  }, [movieDetails, userData]);

  // Добавление в избранное
  const handleAddToFavorites = async () => {
    if (!movieDetails?.id || isFavorite) return;

    try {
      const response = await fetch("https://cinemaguide.skillbox.cc/favorites", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: String(movieDetails.id) }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Не удалось добавить в избранное");
      }

      setIsFavorite(true);
      setUserData(prev => ({
        ...prev,
        favorites: [...(prev.favorites || []), String(movieDetails.id)],
      }));
    } catch (error) {
      console.error("Ошибка при добавлении в избранное:", error);
    }
  };

  const formatRuntime = (minutes: number) => {
    if (!minutes || minutes <= 0) return "Неизвестно";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins} мин`;
  };

  if (loading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error}</div>;

  if (!movieDetails) return <div>Фильм не найден</div>;

  return (
    <div className="content">
      <div className="container">
        <div className="home__container">
          <div className="grid__home-group">
            <div className="home__group-charact">
              <div
                className="home__raiting"
                style={{
                  backgroundColor: movieDetails.tmdbRating < 6 ? "#A59400" : "#C82020",
                  borderRadius: "10px",
                  transition: "background-color 0.5s ease",
                }}
              >
                <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z"
                    fill="white"
                  />
                </svg>
                {movieDetails.tmdbRating}
              </div>
              <span className="home__year">{movieDetails.releaseYear}</span>
              <span className="home__genre">
                {movieDetails.genres
                  ? movieDetails.genres.map((genre: string) => t(`genres.${genre.toLowerCase()}`)).join(", ")
                  : "Нет жанров"}
              </span>
              <span className="home__runtime">{formatRuntime(movieDetails.runtime)}</span>
            </div>

            <div className="home__group-title">
              <h1 className="home__head-title">{movieDetails.title}</h1>
              <p className="home__description">{movieDetails.plot}</p>
            </div>

            <div className="home__group-button">
              {movieDetails.trailerUrl && (
                <a className="home__play" href={movieDetails.trailerUrl} target="_blank" rel="noopener noreferrer">
                  Трейлер
                </a>
              )}

              <button
                className={`home__favorites ${isFavorite ? "favorite-added" : ""}`}
                onClick={handleAddToFavorites}
                disabled={isFavorite}
              >
                {isFavorite ? "В избранном" : "Добавить в избранное"}
              </button>
            </div>
          </div>

          <div className="home__group-img">
            {movieDetails.posterUrl ? (
              <img src={movieDetails.posterUrl} alt={movieDetails.title} />
            ) : (
              <p>Изображение отсутствует</p>
            )}
          </div>

         
        </div>
         <div className="movie-details">
            <h2 className="movie-details__heading">О фильме</h2>
            <ul className="movie-details__list">
              <li className="movie-details__list-item">
                <span className="movie-details__list-item-label">Язык оригинала</span>
                <span className="movie-details__list-item-dashed"></span>
                <span className="movie-details__list-item-label">{movieDetails.language || "Нет описания"}</span>
              </li>
              <li className="movie-details__list-item">
                <span className="movie-details__list-item-label">Бюджет:</span>
                <span className="movie-details__list-item-dashed"></span>
                <span className="movie-details__list-item-value">{movieDetails.budget || "Неизвестно"}</span>
              </li>
              <li className="movie-details__list-item">
                <span className="movie-details__list-item-label">Выручка:</span>
                <span className="movie-details__list-item-dashed"></span>
                <span className="movie-details__list-item-value">{movieDetails.revenue || "Нет данных"}</span>
              </li>
              <li className="movie-details__list-item">
                <span className="movie-details__list-item-label">Режиссер</span>
                <span className="movie-details__list-item-dashed"></span>
                <span className="movie-details__list-item-value">{movieDetails.director || "Неизвестно"}</span>
              </li>
              <li className="movie-details__list-item">
                <span className="movie-details__list-item-label">Продакшен:</span>
                <span className="movie-details__list-item-dashed"></span>
                <span className="movie-details__list-item-value">{movieDetails.production || "Нет данных"}</span>
              </li>
              <li className="movie-details__list-item">
                <span className="movie-details__list-item-label">Награды:</span>
                <span className="movie-details__list-item-dashed"></span>
                <span className="movie-details__list-item-value">{movieDetails.awardsSummary || "Нет данных"}</span>
              </li>
            </ul>
          </div>
      </div>
      </div>
  )
  }

export default MovieDetails;