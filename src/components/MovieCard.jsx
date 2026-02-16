import React from 'react';
import { Link } from 'react-router-dom';
import './MovieCard.css';
import { IMAGE_BASE_URL } from '../api/api';

const MovieCard = ({ movie }) => {
    const { id, title, poster_path, vote_average, overview } = movie;

    return (
        <Link to={`/movie/${id}`} className="movie-card-link">
            <div className="movie-card">
                <div className="poster-wrapper">
                    {poster_path ? (
                        <img
                            src={`${IMAGE_BASE_URL}${poster_path}`}
                            alt={title}
                            loading="lazy"
                        />
                    ) : (
                        <div className="placeholder-poster">
                            <span>No Image</span>
                        </div>
                    )}
                    <div className="rating-badge">
                        <span>★</span> {vote_average?.toFixed(1)}
                    </div>
                </div>
                <div className="info">
                    <h3>{title}</h3>
                    <p className="overview">
                        {overview ? (overview.length > 100 ? `${overview.slice(0, 100)}...` : overview) : "No description available."}
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default MovieCard;
