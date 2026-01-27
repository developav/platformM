import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { setMovieDetails, setLoading, setError } from '../../slice/headMovieSlice';
import { useTranslation } from "react-i18next";
import Modal from "../../components/modalTrailer/ModalTrailer";
import '../main/main.scss';
import './MoveDetails.scss'

const MovieDetails = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модалки
  const { movieDetails, loading, error } = useTypedSelector((state) => state.movie);
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [userData, setUserData] = useState<{ favorites?: string[] }>({});
  const [isFavorite, setIsFavorite] = useState(false);
 const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
                <a className="home__play" onClick={openModal} target="_blank" rel="noopener noreferrer">
                  Трейлер
                </a>
                
              )}

              <button
                className={`home__favorites ${isFavorite ? "favorite-added" : ""}`}
                onClick={handleAddToFavorites}
                disabled={isFavorite}
              >
                {isFavorite ? (<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z" fill="#B4A9FF"/>
</svg>
) : (<svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z" fill="white"/>
</svg>
)}
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
 <Modal
            isOpen={isModalOpen}
            onClose={closeModal}
            trailerYouTubeId={movieDetails.trailerYouTubeId}
          />
         
        </div>
          <div className="movie-details">
            <h2 className="movie-details__heading">О фильме</h2>
              <ul className="movie-details__list">
                {[
                  { label: "Язык оригинала", value: movieDetails.language },
                  { label: "Бюджет", value: movieDetails.budget },
                  { label: "Выручка", value: movieDetails.revenue },
                  { label: "Режиссер", value: movieDetails.director },
                  { label: "Продакшен", value: movieDetails.production },
                  { label: "Награды", value: movieDetails.awardsSummary },
                ].map((item, index) => (
                  <li key={index} className="movie-details__list-item">
                    <span className="movie-details__list-item-label">{item.label}</span>
                    <span className="movie-details__list-item-dashed"></span>
                    <span className="movie-details__list-item-value">{item.value || "Неизвестно"}</span>
                  </li>
                ))}
              </ul>
          </div>
      </div>
      </div>
  )
  }

export default MovieDetails;