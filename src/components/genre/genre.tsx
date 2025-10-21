import { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setGenreMovies, setLoading, setError } from '../../slice/headMovieSlice';
import './genre.scss';

// Маппинг жанров с английского на русский
const genreMapping: Record<string, string> = {
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

const genreImages: Record<string, string> = {
  "history": "../public/history.png",
  "horror": "Ужасы",
  "scifi": "../public/fantastic.png",
  "stand-up": "Стэндап",
  "fantasy":"",
  "drama": "../public/dram.png",
  "mystery": "../public/detect.png",
  "family": "../public/family.png",
  "comedy": "../public/comedy.png",
  "romance": "Романтика",
  "music": "Музыка",
  "crime": "Преступление",
  "tv-movie": "ТВ-фильм",
  "documentary": "Документальный",
  "action": "Экшн",
  "thriller": "../public/triller.png",
  "western": "Вестерн",
  "animation": "Анимация",
  "war": "Война",
  "adventure": "../public/adventure.png",
};
const genreOrder = [
  "drama", "comedy", "mystery", "family", "history", "thriller", "scifi", "adventure", "horror",  "stand-up", "fantasy",
   "romance", "music", "crime", "tv-movie", "documentary", "action", 
  "western", "animation", "war", 
];

const Genres = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, genreMovies } = useSelector((state: any) => state.movie);

  const yourToken = "frontdeveloper";
  const [visibleGenres, setVisibleGenres] = useState(8)

  const fetchGenres = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    fetch('https://cinemaguide.skillbox.cc/movie/genres', {
      method: 'GET',
      credentials: "include",
      headers: {
        "Authorization": `Bearer ${yourToken}`,
        "Content-Type": "application/json"
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Ошибка при загрузке жанров');
        }
        return response.json();
      })
      .then(data => {
        dispatch(setGenreMovies(data));
      })
      .catch(error => {
        dispatch(setError(error.message || 'Произошла ошибка'));
      })
      .finally(() => {
        dispatch(setLoading(false));
      });
  }, [dispatch]);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleShowMore = () => {
    setVisibleGenres(prev => prev + 8)
  }

  const handleClick = (genre: string) => {
    navigate(`/movie/genre/${genre}`);
  };
  const sortedGenres = genreMovies.map((genre:string)=> ({
    genre, 
    order: genreOrder.indexOf(genre),
  }))
  // .filter((genreObj) => genreObj.order !== -1)
  // .sort((a, b) => a.order - b.order)

  return (
    <div className='container'>
      <div className="genre-container">
          <h2 className="genre-title">Жанры фильмов</h2>
          {loading && <p>Загрузка жанров...</p>}
          {error && <p className="error-message">Ошибка: {error}</p>}
          <div className="genre-grid">
            {sortedGenres.slice(0, visibleGenres).map(({genre} : {genre:string}) => (
              <div key={genre} className="genre-card" onClick={()=> handleClick(genre)}>
                  <img src={genreImages[genre]} alt={genre} className="genre-image" />
                  <div className="genre-label">{genreMapping[genre] || genre}</div>
              </div>
            ))}
          </div>
            {visibleGenres < genreMovies.length && (
              <button className='genre-show' onClick={handleShowMore}>Показать еще</button>
            )}
        </div>
    </div>
  
  );
};

export default Genres;