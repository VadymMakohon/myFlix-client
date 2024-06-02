import React, { useEffect, useState } from "react";
import { UserInfo } from "./user-info";
import { Button, Card, Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FavouriteMovies } from "./favorite-movies"; // Import the FavoriteMovies component
import Form from "react-bootstrap/Form";
import "./profile-view.scss";

export const ProfileView = ({ localUser, token, updateUser, movies }) => {
    const [username, setUsername] = useState(localUser.Username);
    const [email, setEmail] = useState(localUser.Email);
    const [password, setPassword] = useState(localUser.Password);
    const [user, setUser] = useState(localUser);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            Username: username,
            Email: email,
            Password: password,
        };

        try {
            const response = await fetch(
                `https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user._id}`,
                {
                    method: "PUT",
                    body: JSON.stringify(formData),
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.ok) {
                alert("Update successful");
                window.location.reload();
            }
        } catch (error) {
            console.error(error);
            alert("Update failed");
        }
    };

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch(
                `https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user._id}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            if (response.ok) {
                alert("Account deleted successfully.");
                localStorage.clear();
                // Redirect the user or update state instead of reloading the page
            } else {
                alert("Something went wrong.");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to delete account.");
        }
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `https://myflix-2024-e9df13718d8a.herokuapp.com/users/id/${user._id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );
                if (response.ok) {
                    const userData = await response.json();
                    setUser(userData);

                    const favoriteMoviesResponse = await fetch(
                        `https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user.Username}/movies`,
                        {
                            headers: { Authorization: `Bearer ${token}` },
                        }
                    );
                    if (favoriteMoviesResponse.ok) {
                        const favoriteMoviesData = await favoriteMoviesResponse.json();
                        // console.log("Favorite Movies Data:", favoriteMoviesData); // Debugging
                        setFavoriteMovies(favoriteMoviesData);
                    } else if (favoriteMoviesResponse.status === 404) {
                        console.error("Favorite movies not found for this user");
                        setFavoriteMovies([]); // Set to empty array if not found
                    } else {
                        console.error("Failed to fetch favorite movies");
                    }
                } else {
                    console.error("Failed to fetch user data");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchUserData();
    }, [user._id, user.Username, token]);

    return (
        <Container className="mx-1">
            <Row>
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title>My Profile</Card.Title>
                        {user && <UserInfo name={user.Username} email={user.Email} />}
                    </Card.Body>
                </Card>
                <Card className="mb-5">
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <h1>Edit profile info</h1>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mb-4"
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email:</Form.Label>
                                <Form.Control
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mb-4"
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                        <Button
                            variant="danger"
                            onClick={handleDeleteAccount}
                            className="mt-3"
                        >
                            Delete Account
                        </Button>
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Col className="mb-5" xs={12} md={12}>
                    {favoriteMovies && (
                        <FavouriteMovies
                            user={user}
                            favouriteMovies={favoriteMovies}
                            updateUser={updateUser}
                            movies={movies}
                        />
                    )}
                </Col>
            </Row>
        </Container>
    );
};
