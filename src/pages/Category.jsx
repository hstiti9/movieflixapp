import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { fetchMoviesByGenre } from '../api/api';
import { getGenreName } from '../utils/genres';

const Category = () => {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGenreMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                const results = await fetchMoviesByGenre(id);
                setMovies(results.results || []);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch movies.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadGenreMovies();
        }
    }, [id]);

    const genreName = getGenreName(id);

    return (
        <div className="category-page">
            <div className="container main-content" style={{ paddingTop: '2rem' }}>
                <h2 style={{
                    fontSize: '2.5rem',
                    marginBottom: '2rem',
                    color: 'var(--accent-color)',
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    textShadow: '0 0 10px var(--accent-glow)'
                }}>
                    {genreName} Movies
                </h2>

                {loading && <div className="loading">Loading...</div>}

                {error && <div className="error">{error}</div>}

                {!loading && !error && movies.length > 0 && (
                    <div className="grid">
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))}
                    </div>
                )}

                {!loading && !error && movies.length === 0 && (
                    <div className="no-results">
                        <h2>No movies found</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Category;
