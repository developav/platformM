import { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.scss"

export default function Navigation() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <header>
            <nav className="navbar">
                    <div className="navbar__container">
                        {/* Логотип */}
                        <Link to="/" className="navbar__logo">
                            <span className="navbar__logo-dot"></span>
                        </Link>

                            {/* Меню (десктоп) */}
                            <ul className="navbar__links">
                                <li><Link to="">Главная</Link></li>
                                <li><Link to="/movie/genre">Жанры</Link></li>
                            </ul>
                            <div className="navbar__custom">
                                <input className="navbar-custom__input" type="text" placeholder="Поиск"/>
                            </div>
                            <a className="navbar__entry" href="#">Войти</a>
                            {/* Бургер-меню (мобильное) */}
                        <button className="navbar__burger" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? "✖" : "☰"}
                        </button>
                    </div>

                        {/* Мобильное меню */}
                        {isOpen && (
                            <ul className="navbar__mobile-menu">
                                <li><Link to="" onClick={() => setIsOpen(false)}>Главная</Link></li>
                                <li><Link to="" onClick={() => setIsOpen(false)}>Жанры</Link></li>
                                <li><Link to="" onClick={() => setIsOpen(false)}>Избранное</Link></li>
                            </ul>
                        )}
                </nav>
        </header>
    
    )
}