import React from "react";
import PropTypes from "prop-types";
import { MovieCard } from "../movie-card/movie-card";
import { Row, Col } from 'react-bootstrap';

export const FavouriteMovies = ({ user, favouriteMovies, updateUser, movies }) => {
    // console.log("FavouriteMovies:", favouriteMovies); // Debugging
    const favList = movies.filter(m => favouriteMovies.includes(m.id));
    return (
        <>
            <h1 className="my-5">Favorite Movies</h1>
            {favList.length === 0 ? (
                <div>List is empty</div>
            ) : (
                <Row md={12}>
                    {favList.map((movie) => (
                        <Col key={movie.id} className="mb-5" md={3}>
                            <MovieCard
                                movie={movie}
                                isFavorite={user?.FavoriteMovies?.includes(movie.id) || false}
                                updateUser={updateUser}
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
    favouriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired, // Expect an array of strings (IDs)
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            ImagePath: PropTypes.string, // Ensure this matches the backend property
            Description: PropTypes.string.isRequired,
            Genre: PropTypes.shape({
                Name: PropTypes.string.isRequired,
            }).isRequired,
            Director: PropTypes.shape({
                Name: PropTypes.string.isRequired,
            }).isRequired,
            Featured: PropTypes.bool.isRequired,
        })
    ).isRequired,
    updateUser: PropTypes.func.isRequired,
};
