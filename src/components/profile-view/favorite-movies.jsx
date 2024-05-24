import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./favorite-movies.scss";

export const FavouriteMovies = ({ user, favouriteMovies }) => {
    console.log("User in FavouriteMovies:", user);
    console.log("FavouriteMovies:", favouriteMovies);

    return (
        <Row>
            <Col className="mb-5">
                <h3>Favorite movies</h3>
            </Col>
            <Row>
                {favouriteMovies.map((movie) => (
                    <Col className="mb-5" key={movie._id} md={4}>
                        <Link to={`/movies/${movie.Title}`}> {/* Assuming movie.Title is used as the identifier */}
                            <MovieCard
                                movie={movie}
                                isFavourite={user.FavoriteMovies.includes(movie._id)}
                            />
                        </Link>
                    </Col>
                ))}
            </Row>
        </Row>
    );
};

FavouriteMovies.propTypes = {
    user: PropTypes.object.isRequired,
    favouriteMovies: PropTypes.array.isRequired
};
