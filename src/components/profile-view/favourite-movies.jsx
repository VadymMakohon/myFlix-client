import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./favourite-movies.scss"

export const FavouriteMovies = ({ user, favouriteMovies, removeFromFavorites }) => {
    return (
        <Col className="mb-5">
            <h3 className="title">Favorite movies</h3>
            <Row>
                {favouriteMovies.map((movie) => (
                    <Col key={movie._id} md={6}>
                        <Link to={`/movies/${movie._id}`} />
                        <MovieCard
                            key={movie._id}
                            isFavorite={user.FavouriteMovies.includes(movie.title)}
                            movie={movie}
                            removeFromFavorites={removeFromFavorites}
                        />
                    </Col>
                ))}
            </Row>
        </Col>
    );
};

FavouriteMovies.propTypes = {
    favouriteMovies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};