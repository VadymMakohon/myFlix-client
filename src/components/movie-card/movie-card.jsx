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

    const [addTitle, setAddTitle] = useState("");
    const [delTitle, setDelTitle] = useState("");

    // ADD MOVIE TO FAVORITES
    const addToFavorites = () => {
        fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user.Username}/movies/${encodeURIComponent(movie.id)}`,
            {
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
                alert("Movie added to favorites successfully!");
                window.location.reload();
                return response.json();
            })
            .then((user) => {
                console.log(user)
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                }
            })
            .catch((error) => {
                console.error(error);
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
                alert("Movie removed from favorites successfully!");
                window.location.reload();
                return response.json();
            })
            .then((user) => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user);
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleAddToFavorites = () => {
        setAddTitle(movie.Title);
    };
    const handleRemoveFromFavorites = () => {
        setDelTitle(movie.Title);
    };

    if (addTitle) {
        addToFavorites();
    }
    if (delTitle) {
        removeFromFavorites();
    }

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
                    <Button variant="primary" onClick={handleRemoveFromFavorites}>Remove from favorites</Button>
                ) : (
                    <Button variant="primary" onClick={handleAddToFavorites}>Add to favorites</Button>
                )}
            </Card>
        </>
    );
};

const propTypes = {
    movie: PropTypes.shape({
        id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
        Image: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired,
        }).isRequired,
        Director: PropTypes.string.isRequired,
        Featured: PropTypes.bool.isRequired,
    }).isRequired,
    isFavorite: PropTypes.bool.isRequired,
    updateUser: PropTypes.func.isRequired,
};



