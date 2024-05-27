import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from 'react-bootstrap';

export const FavouriteMovies = ({ user, favouriteMovies }) => {
    return (
        <>
            <h1 className="my-5">Favorite Movies</h1>
            {favouriteMovies.length === 0 ? (
                <div>List is empty</div>
            ) : (
                <Row md={12}>
                    {favouriteMovies.map((movie) => (
                        <Col key={movie._id} className="mb-5" md={3}>
                            <MovieCard
                                movie={movie}
                                isFavorite={user.FavoriteMovies.includes(movie._id)}
                            />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    );
};

FavouriteMovies.propTypes = {
    user: PropTypes.shape({
        FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    favouriteMovies: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            Image: PropTypes.string.isRequired,
            Description: PropTypes.string.isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string.isRequired,
            }).isRequired,
            Director: PropTypes.string.isRequired,
            Featured: PropTypes.bool.isRequired,
        })
    ).isRequired,
};