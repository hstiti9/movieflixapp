import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchMovieDetails, IMAGE_BACKDROP_URL, IMAGE_BASE_URL } from '../api/api';
import '../App.css';

const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDetails = async () => {
            setLoading(true);
            try {
                const data = await fetchMovieDetails(id);
                setMovie(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load movie details.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadDetails();
        }
    }, [id]);

    if (loading) return <div className="loading">Loading details...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!movie) return <div className="error">Movie not found</div>;

    const backdropStyle = {
        backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, var(--primary-bg) 100%), url(${IMAGE_BACKDROP_URL}${movie.backdrop_path})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    };

    return (
        <div className="movie-details-page">
            <div className="hero-backdrop" style={backdropStyle}>
                <div className="container backdrop-content">
                    <div className="poster-section">
                        <img
                            src={movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : ''}
                            alt={movie.title}
                            className="detail-poster"
                        />
                    </div>
                    <div className="detail-info">
                        <h1 className="detail-title">{movie.title}</h1>
                        <div className="detail-meta">
                            <span className="release-date">{new Date(movie.release_date).getFullYear()}</span>
                            <span className="runtime">{movie.runtime} min</span>
                            <span className="rating">★ {movie.vote_average?.toFixed(1)}</span>
                        </div>

                        <div className="genres-list">
                            {movie.genres?.map(g => (
                                <Link to={`/category/${g.id}`} key={g.id} className="genre-tag">
                                    {g.name}
                                </Link>
                            ))}
                        </div>

                        <p className="tagline">{movie.tagline}</p>

                        <div className="overview-section">
                            <h3>Overview</h3>
                            <p>{movie.overview}</p>
                        </div>


                        {movie.credits?.cast?.length > 0 && (
                            <div className="cast-section">
                                <h3>Top Cast</h3>
                                <div className="cast-grid">
                                    {movie.credits.cast.slice(0, 6).map(person => (
                                        <div key={person.id} className="cast-card">
                                            <div className="cast-img">
                                                {person.profile_path ? (
                                                    <img src={`${IMAGE_BASE_URL}${person.profile_path}`} alt={person.name} />
                                                ) : (
                                                    <div className="no-profile">?</div>
                                                )}
                                            </div>
                                            <p className="cast-name">{person.name}</p>
                                            <p className="cast-character">{person.character}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;
