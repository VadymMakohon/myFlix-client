import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss"

export const MovieCard = ({ movie, isFavorite }) => {
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [addTitle, setAddTitle] = useState("");
    const [delTitle, setDelTitle] = useState("");

    //ADD MOVIES TO FAVORITE
    useEffect(() => {
        const addToFavorites = () => {
            fetch("https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user.UserName}/movies/${encodeURIComponent(movie.title)}",
                {
                    method: 'POST',
                    // body: JSON.stringify(favoriteMoviesData),
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                },
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to add movie to favorites.");
                    }
                    alert("Movie added to favorites successfully!");
                    window.location.reload();
                    return response.json()
                })
                .then((user) => {
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                        setUser(user)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        const removeFromFavorites = () => {
            fetch("https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user.UserName}/movies/${encodeURIComponent(movie.title)}",
                {
                    method: 'DELETE',
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                },
            )
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to remove movie from favorites.");
                    }
                    alert("Movie removed from favorites successfully!");
                    window.location.reload();
                    return response.json()
                })
                .then((user) => {
                    if (user) {
                        localStorage.setItem('user', JSON.stringify(user));
                        setUser(user)
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        if (addTitle) {
            addToFavorites();
        };
        if (delTitle) {
            removeFromFavorites();
        }
    }, [addTitle, delTitle, token]);
    const handleAddToFavorites = () => {
        setAddTitle(movie.title)
    };
    const handleRemoveFromFavorites = () => {
        setDelTitle(movie.title)
    };
    return (
        <>
            <Link className="link-card" to={`/movies/${encodeURIComponent(movie.id)}`}>
                <Card>
                    <Card.Img variant="top" src={movie.image} />
                    <Card.Body>
                        <Card.Title>{movie.title}</Card.Title>
                        <Card.Text>{movie.genre.join(", ")}</Card.Text>
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
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        featured: PropTypes.bool,
        id: PropTypes.string.isRequired
    }).isRequired
};