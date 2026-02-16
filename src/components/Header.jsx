import { NavLink, Link } from 'react-router-dom';
import { GENRES } from '../utils/genres';
import '../App.css';

const Header = () => {
    return (
        <header className="app-header">
            <div className="container header-content">
                <Link to="/" className="logo">
                    Movie<span className="highlight">Flix</span>
                </Link>
                <nav className="main-nav">
                    <ul>
                        <li>
                            <NavLink
                                to="/"
                                className={({ isActive }) => isActive ? "active" : ""}
                                end
                            >
                                Popular
                            </NavLink>
                        </li>
                        {GENRES.map((genre) => (
                            <li key={genre.id}>
                                <NavLink
                                    to={`/category/${genre.id}`}
                                    className={({ isActive }) => isActive ? "active" : ""}
                                >
                                    {genre.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
