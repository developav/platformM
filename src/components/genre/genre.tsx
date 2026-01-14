import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFetchGenres } from "../../hooks/useFetchGenres";
import { genreMapping, genreImages, GenreKey } from "../../constants/genres";
import './genre.scss';

const genreOrder: GenreKey[] = [
  "drama", "comedy", "mystery", "family", "history", "thriller", "scifi", "adventure", "horror",  "stand-up", "fantasy",
   "romance", "music", "crime", "tv-movie", "documentary", "action", 
  "western", "animation", "war", 
];

const Genres = () => {
  const navigate = useNavigate();
  const { loading, error, genreMovies } = useSelector((state: any) => state.movie);

  const [visibleGenres, setVisibleGenres] = useState(8)

 const fetchGenres = useFetchGenres();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  const handleShowMore = () => {
    setVisibleGenres(prev => prev + 8)
  }

  const handleClick = (genre: string) => {
    navigate(`/movie/genre/${genre}`);
  };
  const sortedGenres = genreMovies
    .filter((g: string): g is GenreKey => genreOrder.includes(g as GenreKey))
    .sort(
      (a: GenreKey, b: GenreKey) =>
        genreOrder.indexOf(a) - genreOrder.indexOf(b)
    );

  return (
    <div className='container'>
      <div className="genre-container">
          <h2 className="genre-title">Жанры фильмов</h2>
          {loading && <p>Загрузка жанров...</p>}
          {error && <p className="error-message">Ошибка: {error}</p>}
          <div className="genre-grid">
            {sortedGenres.slice(0, visibleGenres).map((genre : GenreKey) => (
              <div key={genre} className="genre-card" onClick={()=> handleClick(genre)}>
                  <img src={genreImages[genre] || "/placeholder-genre.png"} alt={genre} className="genre-image" />
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