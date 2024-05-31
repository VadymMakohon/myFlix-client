import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, isFavorite, updateUser }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    // ADD MOVIE TO FAVORITES
    const addToFavorites = () => {
        if (user.FavoriteMovies.includes(movie.id)) {
            alert("This movie is already in your favorites.");
            return;
        }

        fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, {
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to add movie to favorites.");
                }
                return response.json();
            })
            .then((updatedUser) => {
                alert("Movie added to favorites successfully!");
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                updateUser(updatedUser);
            })
            .catch((error) => {
                console.error(error);
                alert("An error occurred while adding the movie to favorites.");
            });
    };

    // REMOVE MOVIE FROM FAVORITES
    const removeFromFavorites = () => {
        fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to remove movie from favorites.");
                }
                return response.json();
            })
            .then((updatedUser) => {
                alert("Movie removed from favorites successfully!");
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                updateUser(updatedUser);
            })
            .catch((error) => {
                console.error(error);
                alert("An error occurred while removing the movie from favorites.");
            });
    };

    return (
        <>
            <Link className="link-card" to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Card>
                    <Card.Img variant="top" src={movie.Image} />
                    <Card.Body>
                        <Card.Title>{movie.Title}</Card.Title>
                        {movie.Genre && <Card.Text>{movie.Genre.Name}</Card.Text>}
                    </Card.Body>
                </Card>
            </Link>
            <Card>
                {isFavorite ? (
                    <Button variant="primary" onClick={removeFromFavorites}>Remove from favorites</Button>
                ) : (
                    <Button variant="primary" onClick={addToFavorites}>Add to favorites</Button>
                )}
            </Card>
        </>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Image: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.shape({
            Name: PropTypes.string.isRequired, // If Director is an object with Name
        }).isRequired, // If Director is an object, update this accordingly
        Featured: PropTypes.bool.isRequired,
    }).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    updateUser: PropTypes.func.isRequired,
};