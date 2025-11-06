import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../../page/ModalAuth/AuthModal";
import "./Navigation.scss";

export default function Navigation() {
  // const [isOpen, setIsOpen] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  // const navigate = useNavigate();
  const fetchProfile = async () => {
    try {
      const response = await fetch("https://cinemaguide.skillbox.cc/profile", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const data = await response.json();
        setUserName(data.name); 
      }
    } catch (err) {
      console.error("Ошибка загрузки профиля", err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  // const handleLogout = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setUserName(null);
  //   navigate("/auth");
  // };
  const handleLoginSuccess = () => {
    fetchProfile(); 
    setIsAuthModalOpen(false); // закрыть модалку
  };

  return (
    <header>
      <div className="container">
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
            <input id="input_nav" className="navbar-custom__input" type="text" placeholder="Поиск" />
          </div>

          {userName ? (
            <div className="navbar__user">
              <span className="navbar__user-name"><Link to='/favorites'>{userName}</Link></span>
              {/* {<button className="navbar__entry" onClick={handleLogout}>Выйти</button>} */}
            </div>
          ) : (
            <button className="navbar__entry" onClick={() => setIsAuthModalOpen(true)}>Войти</button>
          )}

          {/* Бургер-меню (мобильное) */}
          <nav className="mobile-navbar__nav">
          <Link to="/movie/genre">
          <a className="mobile-navbar__button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 11.5C4.51472 11.5 2.5 9.48528 2.5 7C2.5 4.51472 4.51472 2.5 7 2.5C9.48528 2.5 11.5 4.51472 11.5 7C11.5 9.48528 9.48528 11.5 7 11.5ZM7 21.5C4.51472 21.5 2.5 19.4853 2.5 17C2.5 14.5147 4.51472 12.5 7 12.5C9.48528 12.5 11.5 14.5147 11.5 17C11.5 19.4853 9.48528 21.5 7 21.5ZM17 11.5C14.5147 11.5 12.5 9.48528 12.5 7C12.5 4.51472 14.5147 2.5 17 2.5C19.4853 2.5 21.5 4.51472 21.5 7C21.5 9.48528 19.4853 11.5 17 11.5ZM17 21.5C14.5147 21.5 12.5 19.4853 12.5 17C12.5 14.5147 14.5147 12.5 17 12.5C19.4853 12.5 21.5 14.5147 21.5 17C21.5 19.4853 19.4853 21.5 17 21.5ZM7 9.5C8.38071 9.5 9.5 8.38071 9.5 7C9.5 5.61929 8.38071 4.5 7 4.5C5.61929 4.5 4.5 5.61929 4.5 7C4.5 8.38071 5.61929 9.5 7 9.5ZM7 19.5C8.38071 19.5 9.5 18.3807 9.5 17C9.5 15.6193 8.38071 14.5 7 14.5C5.61929 14.5 4.5 15.6193 4.5 17C4.5 18.3807 5.61929 19.5 7 19.5ZM17 9.5C18.3807 9.5 19.5 8.38071 19.5 7C19.5 5.61929 18.3807 4.5 17 4.5C15.6193 4.5 14.5 5.61929 14.5 7C14.5 8.38071 15.6193 9.5 17 9.5ZM17 19.5C18.3807 19.5 19.5 18.3807 19.5 17C19.5 15.6193 18.3807 14.5 17 14.5C15.6193 14.5 14.5 15.6193 14.5 17C14.5 18.3807 15.6193 19.5 17 19.5Z" fill="white"/>
              </svg>
            </a>
          </Link>
              <a className="mobile-navbar__button" onClick={() => setIsSearchVisible(!isSearchVisible)}>
                
                <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="white"/>
                </svg>
              </a>
              <a className="mobile-navbar__button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z" fill="white"/>
                </svg>
              </a>
          </nav>
          {isSearchVisible && (
            <div className="mobile-navbar__search">
              <div className="mobile-navbar__search-wrapper">
                <span className="search-icon">
                  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.031 14.6168L20.3137 18.8995L18.8995 20.3137L14.6168 16.031C13.0769 17.263 11.124 18 9 18C4.032 18 0 13.968 0 9C0 4.032 4.032 0 9 0C13.968 0 18 4.032 18 9C18 11.124 17.263 13.0769 16.031 14.6168ZM14.0247 13.8748C15.2475 12.6146 16 10.8956 16 9C16 5.1325 12.8675 2 9 2C5.1325 2 2 5.1325 2 9C2 12.8675 5.1325 16 9 16C10.8956 16 12.6146 15.2475 13.8748 14.0247L14.0247 13.8748Z" fill="white" fill-opacity="0.8"/>
                  </svg>
                </span>
                <input type="text" placeholder="Поиск фильмов..." autoFocus onBlur={() => setIsSearchVisible(false)}/>
                <button className="close-icon" onClick={() => setIsSearchVisible(false)}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.99873 5.5865L11.9485 0.636719L13.3627 2.05093L8.41293 7.0007L13.3627 11.9504L11.9485 13.3646L6.99873 8.4149L2.04899 13.3646L0.634766 11.9504L5.58453 7.0007L0.634766 2.05093L2.04899 0.636719L6.99873 5.5865Z" fill="white"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
          {/* <button className="navbar__burger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "✖" : "☰"}
          </button> */}
        </div>

        {/* Мобильное меню */}
        {/* {isOpen && (
          <ul className="navbar__mobile-menu">
            <li><Link to="/" onClick={() => setIsOpen(false)}>Главная</Link></li>
            <li><Link to="/movie/genre" onClick={() => setIsOpen(false)}>Жанры</Link></li>
            <li><Link to="/favorites" onClick={() => setIsOpen(false)}>Избранное</Link></li>
          </ul>
        )} */}
      </nav>
      </div>
      

{isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} onLoginSuccess={handleLoginSuccess} />}
    </header>
  );
}