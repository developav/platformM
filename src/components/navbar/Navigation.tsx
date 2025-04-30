import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthModal from "../../page/ModalAuth/AuthModal";
import "./Navigation.scss";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("https://cinemaguide.skillbox.cc/profile", {
          method: "GET",
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserName(data.surname); // если структура другая — уточни
        }
      } catch (err) {
        console.error("Ошибка загрузки профиля", err);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setUserName(null);
    navigate("/auth");
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar__container">
          {/* Логотип */}
          <Link to="/" className="navbar__logo">
            <span className="navbar__logo-dot"></span>
          </Link>

          {/* Меню (десктоп) */}
          <ul className="navbar__links">
            <li><Link to="/">Главная</Link></li>
            <li><Link to="/movie/genre">Жанры</Link></li>
          </ul>

          {/* Поиск */}
          <div className="navbar__custom">
            <input className="navbar-custom__input" type="text" placeholder="Поиск" />
          </div>

          {userName ? (
            <div className="navbar__user">
              <span className="navbar__username">{userName}</span>
              <button className="navbar__entry" onClick={handleLogout}>Выйти</button>
            </div>
          ) : (
            <button className="navbar__entry" onClick={() => setIsAuthModalOpen(true)}>Войти</button>
          )}

          {/* Бургер-меню (мобильное) */}
          <button className="navbar__burger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button>
        </div>

        {/* Мобильное меню */}
        {isOpen && (
          <ul className="navbar__mobile-menu">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Главная</Link></li>
            <li><Link to="/movie/genre" onClick={() => setIsOpen(false)}>Жанры</Link></li>
            <li><Link to="/favorites" onClick={() => setIsOpen(false)}>Избранное</Link></li>
          </ul>
        )}
      </nav>
      {isOpen && (
  <ul className="navbar__mobile-menu">
    <li><Link to="/" onClick={() => setIsOpen(false)}>Главная</Link></li>
    <li><Link to="/movie/genre" onClick={() => setIsOpen(false)}>Жанры</Link></li>
    <li><Link to="/favorites" onClick={() => setIsOpen(false)}>Избранное</Link></li>
  </ul>
)}

{isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
    </header>
  );
}