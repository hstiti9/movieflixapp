import { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import { fetchMovies } from '../api/api';

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loadMovies = async (query = '') => {
        setLoading(true);
        setError(null);

        try {
            const results = await fetchMovies(query);
            setMovies(results.results || []);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch movies. Please check your internet connection or API key.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMovies();
    }, []);

    const handleSearch = (query) => {
        loadMovies(query);
    };

    return (
        <div className="home-page">
            <div className="hero-banner">
                <div className="container">
                    <h1 className="hero-logo">
                        Movie<span className="highlight">Flix</span>
                    </h1>
                    <p className="hero-slogan">Discover your next favorite film</p>
                </div>
            </div>

            <div className="container main-content">
                <SearchBar onSearch={handleSearch} />

                {loading && <div className="loading">Loading...</div>}

                {error && <div className="error">{error}</div>}

                {!loading && !error && (
                    <>
                        {movies.length > 0 ? (
                            <div className="grid">
                                {movies.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </div>
                        ) : (
                            <div className="no-results">
                                <h2>No movies found</h2>
                                <p>Try searching for something else.</p>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Home;
