import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MovieCard } from '../movie-card/movie-card';
import { Link } from 'react-router-dom';

export const FavouriteMovies = ({ user, favouriteMovies }) => {
    return (
        <Row>
            <Col md={12}>
                <h3>My Movies</h3>
            </Col>
            <Row>
                {favouriteMovies.map((movie) => {
                    return (
                        <Col className="mb-5" key={movie.id} md={4}>
                            <Link to={`/movies/${movie.Title}`}>
                                <MovieCard
                                    movie={movie}
                                    isFavorite={user.favoriteMovies.includes(movie.Title)}
                                />
                            </Link>
                        </Col>
                    );
                })}
            </Row>
        </Row>
    );
};

// Define propTypes for the FavouriteMovies component
FavouriteMovies.propTypes = {
    user: PropTypes.object.isRequired,
    favouriteMovies: PropTypes.array.isRequired,
};
