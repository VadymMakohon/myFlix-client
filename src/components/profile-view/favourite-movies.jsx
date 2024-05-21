import React from "react";
import PropTypes from "prop-types";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./favourite-movies.scss"

export const FavouriteMovies = ({ user, favouriteMovies }) => {
    return (
        <Row>
            <Col className="mb-5">
                <h3>Favorite movies</h3>
            </Col>
            <Row>
                {favouriteMovies.map((movie) => {
                    return (
                        <Col className="mb-5" key={movie.id} md={4}>
                            <Link to={`/movies/${movie.Title}`} />
                            <MovieCard
                                movie={movie}
                                isFavourite={user.favouriteMovies.includes(movie.Title)}
                            />
                        </Col>
                    );
                })}
            </Row>
        </Row>
    )
}

FavouriteMovies.propTypes = {
    favouriteMovies: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
};
