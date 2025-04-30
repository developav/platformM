import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setGenreFilmsCards, setLoading, setError } from '../../slice/headMovieSlice';
import { useParams, useNavigate } from 'react-router-dom';
import './genreFilms.scss';


const genreFilmsMapping: Record<string, string> = {
    "history": "Историческое",
    "horror": "Ужасы",
    "scifi": "Фантастика",
    "stand-up": "Стэндап",
    "fantasy": "Фэнтези",
    "drama": "Драма",
    "mystery": "Детектив",
    "family": "Семейное",
    "comedy": "Комедия",
    "romance": "Романтика",
    "music": "Музыка",
    "crime": "Преступление",
    "tv-movie": "ТВ-фильм",
    "documentary": "Документальный",
    "action": "Экшн",
    "thriller": "Триллер",
    "western": "Вестерн",
    "animation": "Анимация",
    "war": "Война",
    "adventure": "Приключения",
  };

const GenreFilmsCards = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { genre } = useParams(); // получаем жанр из URL
  const { genreFilmsCards, loading, error } = useSelector((state: any) => state.movie);

  const fetchGenreFilmsCards = useCallback(() => {
    if (!genre) return;

    dispatch(setLoading(true));
    dispatch(setError(null));

    fetch(`https://cinemaguide.skillbox.cc/movie?genre=${genre}&count=12&page=1`, {
      method: 'GET',
      headers: {
        "Authorization": "Bearer frontdeveloper",
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке фильмов');
        }
        return response.json();
        
      })
      .then(data => {
        dispatch(setGenreFilmsCards(data));
      })
      .catch(error => {
        dispatch(setError(error.message || 'Произошла ошибка'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch, genre]);

  useEffect(() => {
    fetchGenreFilmsCards();
  }, [fetchGenreFilmsCards]);

  const handleClick = () => {
    navigate('/movie/genre')
  }
  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="genre-films-container">
        <h2 className="genre-title" onClick ={handleClick}> 
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.047 20.0012L26.2967 28.2507L23.9397 30.6077L13.333 20.0012L23.9397 9.39453L26.2967 11.7515L18.047 20.0012Z" fill="white"/>
        </svg>

        {genreFilmsMapping[genre] || genre}</h2>
      {loading && <p className='content'>Загрузка фильмов...</p>}
      {error && <p className="error">{error}</p>}
      <div className="films-grid">
        {genreFilmsCards.map((film: any) => (
          <div key={film.id} className="films-card" onClick={()=> handleMovieClick(film.id)}>
            <img className='films-card-img' src={film.posterUrl} alt={film.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenreFilmsCards;