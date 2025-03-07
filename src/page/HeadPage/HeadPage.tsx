import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setMovie, setLoading, setError } from '../../slice/headMovieSlice';  // Импорт действий
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useTranslation } from "react-i18next";
import Top10Movies from "../../components/topTen/topTen";
import './headPage.scss';

i18n.use(initReactI18next).init({
    resources: {
      en: {
        translation: {
          genres: {
            action: "Action",
            drama: "Drama",
            mystery: "mystery",
            horror: "horror",
            thriller: "thriller",
            romance:"romance"
          },
        },
      },
      ru: {
        translation: {
          genres: {
            action: "Боевик",
            drama: "Драма",
            mystery: "Фентези",
            horror: "Ужасы",
            thriller: "Триллер",
            romance:"Роман"
          },
        },
      },
    },
    lng: "ru",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
  

const RandomMovie = () => {
    
    const dispatch = useDispatch();
    const { movie, loading, error } = useSelector(state => state.movie); // Получаем данные из Redux
    const { t } = useTranslation();
  
    // Получаем случайный фильм
    const fetchMovie = () => {
      dispatch(setLoading(true)); // Устанавливаем состояние загрузки
      dispatch(setError(null)); // Сбрасываем ошибку
  
      fetch('https://cinemaguide.skillbox.cc/movie/random') // URL API
        .then(response => {
          if (!response.ok) {
            throw new Error("Ошибка при загрузке данных");
          }
          return response.json();
        })
        .then(data => {
          dispatch(setMovie(data)); // Сохраняем фильм в Redux
          localStorage.setItem('movie', JSON.stringify(data)); // Сохраняем в localStorage
        })
        .catch(error => {
          dispatch(setError(error.message)); // Устанавливаем ошибку
        })
        .finally(() => {
          dispatch(setLoading(false)); // Заканчиваем загрузку
        });
    };
    // Запрос будет выполняться один раз при монтировании компонента
    useEffect(() => {
      const storedMovie = localStorage.getItem('movie');
      if (storedMovie) {
        dispatch(setMovie(JSON.parse(storedMovie))); // Загружаем из localStorage, если есть
      } else {
        fetchMovie(); // Если нет, делаем запрос
      }
    }, [dispatch]);

  const formatRuntime = (minutes) => {
    if (!minutes || minutes <= 0) return "Неизвестно";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins} мин`;
  };

  return (
    <div className='container'>
      {movie && (
        <div>
            <div className='home__container'>
                <div className='grid__home-group'>
                    <div className='home__group-charact'>
                        <div className='home__raiting' style={{backgroundColor: movie && movie.tmdbRating < 6 ? "#A59400" : "#C82020",borderRadius: "10px",transition: "background-color 0.5s ease"}}>
                            <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z" fill="white"/>
                            </svg>{movie.tmdbRating} 
                        </div>
                        <span className='home__year'> {movie.releaseYear} </span>
                        <span className='home__genre'> {" "} {movie.genres ? movie.genres.map((genre) => t(`genres.${genre.toLowerCase()}`)).join(", ") : "Нет жанров"}</span>
                        <span className='home__runtime'> {formatRuntime(movie.runtime)}</span>
                    </div>
                    <div className='home__group-title'>
                        <h1 className='home__head-title'> {movie.title}</h1>
                        <p className='home__description'> {movie.plot}</p>
                    </div>
                    <div className='home__group-button'>
                        {movie.trailerUrl && (
                            <a className='home__play' href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">Трейлер</a>
                        )}
                        <a href='#' className='home__about'>О фильме</a>
                        <a href="#" className='home__favorites'>
                            <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14.5 0C17.5376 0 20 2.5 20 6C20 13 12.5 17 10 18.5C7.5 17 0 13 0 6C0 2.5 2.5 0 5.5 0C7.35997 0 9 1 10 2C11 1 12.64 0 14.5 0ZM10.9339 15.6038C11.8155 15.0485 12.61 14.4955 13.3549 13.9029C16.3337 11.533 18 8.9435 18 6C18 3.64076 16.463 2 14.5 2C13.4241 2 12.2593 2.56911 11.4142 3.41421L10 4.82843L8.5858 3.41421C7.74068 2.56911 6.5759 2 5.5 2C3.55906 2 2 3.6565 2 6C2 8.9435 3.66627 11.533 6.64514 13.9029C7.39 14.4955 8.1845 15.0485 9.0661 15.6038C9.3646 15.7919 9.6611 15.9729 10 16.1752C10.3389 15.9729 10.6354 15.7919 10.9339 15.6038Z" fill="white"/>
                            </svg>
                        </a>
                        <a className='home__refresh' onClick={fetchMovie} disabled={loading}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10 2C12.7486 2 15.1749 3.38626 16.6156 5.5H14V7.5H20V1.5H18V3.99936C16.1762 1.57166 13.2724 0 10 0C4.47715 0 0 4.47715 0 10H2C2 5.58172 5.58172 2 10 2ZM18 10C18 14.4183 14.4183 18 10 18C7.25144 18 4.82508 16.6137 3.38443 14.5H6V12.5H0V18.5H2V16.0006C3.82381 18.4283 6.72764 20 10 20C15.5228 20 20 15.5228 20 10H18Z" fill="white"/>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <div className='home__group-img'>
                    {movie.posterUrl ? (
                    <img src={movie.posterUrl} alt={movie.title} />
                    ) : (
                    <p>Изображение отсутствует</p>
                    )}
                </div>
            </div>
            
          


          {/* <p><strong>Бюджет:</strong> {movie.budget}</p>
          <p><strong>Выручка:</strong> {movie.revenue}</p>
          <p><strong>Статус:</strong> {movie.status}</p> */}
          {/* <p><strong>Режиссер:</strong> {movie.director}</p>
          <p><strong>Страна происхождения:</strong> {movie.countriesOfOrigin.join(', ')}</p>
          <p><strong>Языки:</strong> {movie.languages.join(', ')}</p>
          <p><strong>Ключевые слова:</strong> {movie.keywords.join(', ')}</p>
          <p><strong>Награды:</strong> {movie.awardsSummary}</p> */}
        </div>
      )}
      <Top10Movies/>
    </div>
  );
};

export default RandomMovie;