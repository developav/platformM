import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
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
  const { id } = useParams<{ id: string }>(); // Явно указываем тип

  // Функция для запроса данных о фильме
  const fetchMovieDetails = (id:string) => {
    console.log("Функция fetchMovieDetails вызвана с ID:", id);
    dispatch(setLoading(true));
    dispatch(setError(null));
    const yourToken = "frontdeveloper";
  
    fetch(`https://cinemaguide.skillbox.cc/movie/${id}`, {
      method: "GET",
      credentials: "include", // Передача cookie с сессией
      headers: {
        "Authorization": yourToken ? `Bearer ${yourToken}` : "", 
        "Content-Type": "application/json"
      }
    })
      .then((response) => {
        console.log("Статус ответа:", response.status);
        if (!response.ok) {
          throw new Error(`Ошибка запроса: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('movieDetails data:', data);  // Проверяем, что приходит из API
        if (data && data.title) {
          dispatch(setMovieDetails(data));
        } else {
          dispatch(setError("Фильм не найден"));
        }
      })
      .catch((error) => {
        console.error("Ошибка запроса:", error);
        dispatch(setError(error.message));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  };
  const handleAddToFavorites = async (e: React.MouseEvent) => {
    e.preventDefault();
    const movieId = movieDetails?.id;
    console.log("ID фильма:", movieId);
    if (!movieId) {
      alert("Ошибка: отсутствует корректный ID фильма.");
      return;
    }
  
    try {
      const response = await fetch('https://cinemaguide.skillbox.cc/favorites', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: String(movieId) }) // <-- важно: приводим к строке
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Ошибка от сервера:', errorText);
        alert(`Ошибка: ${errorText || 'Не удалось добавить в избранное'}`);
        return;
      }
  
      const data = await response.json();
      alert('Фильм добавлен в избранное!');
      console.log("Ответ от сервера:", data);
    } catch (error) {
      console.error('Ошибка при добавлении в избранное:', error);
      alert('Произошла ошибка. Попробуйте позже.');
    }
  };
  // useEffect должен быть ВНЕ функции fetchMovieDetails
  useEffect(() => {
    if (id) {
      console.log("Запрашиваем фильм с ID:", id);
      fetchMovieDetails(id);
    }
  }, [id]);

  // Функция для форматирования продолжительности фильма
  const formatRuntime = (minutes:number) => {
    if (!minutes || minutes <= 0) return "Неизвестно";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins} мин`;
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className="content">
      {movieDetails ? (
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
                    ? movieDetails.genres.map((genre:string) => t(`genres.${genre.toLowerCase()}`)).join(", ")
                    : "Нет жанров"}
                </span>
                <span className="home__runtime">
                  {formatRuntime(movieDetails.runtime)}
                </span>
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
                <a href="#" className="home__favorites" onClick={handleAddToFavorites}>
                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="home__group-img">
              {movieDetails.posterUrl ? (
                <img src={movieDetails.posterUrl} alt={movieDetails.title} />) : (
                <p>Изображение отсутствует</p>
              )}
            </div>
          </div>

          <div className="movie-details">
            <h2 className='movie-details__heading'>О фильме</h2>
            <ul className='movie-details__list'>
              <li className='movie-details__list-item'>
                <span className='movie-details__list-item-label'>Язык оригинала</span>
                <span className='movie-details__list-item-dashed'></span>
                <span className='movie-details__list-item-label'>{movieDetails.language || "Нет описания"}</span>
              </li>
              <li className='movie-details__list-item'>
                <span className='movie-details__list-item-label'>Бюджет:</span>
                <span className='movie-details__list-item-dashed'></span>
                <span className='movie-details__list-item-value'>{movieDetails.budget || "Неизвестно"}</span>
              </li>
              <li className='movie-details__list-item'>
                <span className='movie-details__list-item-label'>Выручка:</span>
                <span className='movie-details__list-item-dashed'></span>
                <span className='movie-details__list-item-value'>{movieDetails.revenue || "Нет данных"}</span>
              </li>
              <li className='movie-details__list-item'>
                <span className='movie-details__list-item-label'>Режиссер</span>
                <span className='movie-details__list-item-dashed'></span>
                <span className='movie-details__list-item-value'>{movieDetails.director || "Неизвестно"}</span>
              </li>
              <li className='movie-details__list-item'>
                <span className='movie-details__list-item-label'>Продакшен:</span>
                <span className='movie-details__list-item-dashed'></span>
                <span className='movie-details__list-item-value'>{movieDetails.production || "Нет данных"}</span>
              </li>
              <li className='movie-details__list-item'>
                <span className='movie-details__list-item-label'>Награды:</span>
                <span className='movie-details__list-item-dashed'></span>
                <span className='movie-details__list-item-value'>{movieDetails.awardsSummary || "Нет данных"}</span>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div>Фильм не найден</div>
      )}
    </div>
  );
};

export default MovieDetails;