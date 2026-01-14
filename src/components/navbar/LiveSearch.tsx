import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./LiveSearch.scss";

type Movie = {
  id: number;
  title: string;
  posterUrl?: string;
  tmdbRating: number;
  releaseYear: number;
  genres: string[];
  runtime: number;
};

const LiveSearch = () => {
  const [query, setQuery] = useState("");
const { t } = useTranslation();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length < 2) {
      setMovies([]);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);

      fetch(
        `https://cinemaguide.skillbox.cc/movie?title=${encodeURIComponent(
          query
        )}`,
        {
          credentials: "include",
          headers: {
            Authorization: "Bearer frontdeveloper",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setMovies(data || []);
        })
        .catch(() => setMovies([]))
        .finally(() => setLoading(false));
    }, 300); // debounce

    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (id: number) => {
    setQuery("");
    setMovies([]);
   
    navigate(`/movie/${id}`);
     console.log("navigate to movie:", id);
  };
    const formatRuntime = (minutes: number) => {
    if (!minutes || minutes <= 0) return "Неизвестно";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours} ч ${mins} мин`;
  };

  return (
    <div className="live-search">
      <input
        type="text"
        placeholder="Поиск"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="live-search__input"
      />

      {/* {loading && <div className="live-search__loading">Загрузка...</div>} */}

      {movies.length > 0 && (
        <ul className="live-search__list">
          {movies.map((movie) => (
            <li
              key={movie.id}
              className="live-search__item"
               onClick={() => handleSelect(movie.id)}
            >
            <img
                src={movie.posterUrl || "/placeholder.jpg"}
                alt={movie.title}
              />
            <div className="live-search__block-info">
            <div className="live-search__charact">
                    <div
                        className="live-search__raiting"
                        style={{
                        backgroundColor: movie.tmdbRating < 6 ? "#A59400" : "#C82020",
                        borderRadius: "10px",
                        transition: "background-color 0.5s ease",
                        }}
                    >
                        <svg width="9" height="9" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.00105 12.1734L3.29875 14.8055L4.34897 9.51997L0.392578 5.86124L5.74394 5.22675L8.00105 0.333374L10.2581 5.22675L15.6095 5.86124L11.6531 9.51997L12.7033 14.8055L8.00105 12.1734Z"
                            fill="white"
                        />
                        </svg>
                        {movie.tmdbRating}
                    </div>
                    <span className="live-search__year">{movie.releaseYear}</span>
                    <span className="live-search__genre">
                        {movie.genres
                        ? movie.genres.map((genre: string) => t(`genres.${genre.toLowerCase()}`)).join(", ")
                        : "Нет жанров"}
                    </span>
                    <span className="live-search__runtime">{formatRuntime(movie.runtime)}</span>
            </div>
                <span className="live-search__item-head">{movie.title}</span>
            </div>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveSearch;