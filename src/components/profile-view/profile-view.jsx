import React, { useEffect, useState } from "react";
import { UserInfo } from "./user-info";
import { Button, Card, Container, FormLabel } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import Form from "react-bootstrap/Form";
import "./profile-view.scss";

export const ProfileView = ({ localUser, movies, token }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(storedUser.Username);
    const [email, setEmail] = useState(storedUser.Email);
    const [password, setPassword] = useState(storedUser.Password);
    const [birthDate, setBirthdate] = useState(storedUser.BirthDate);
    const [user, setUser] = useState({});
    const [userid, setUserid] = useState(storedUser._id);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            Username: username,
            Email: email,
            Password: password
        };

        try {
            const response = await fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/${userid}`, {
                method: "PUT",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            });
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
            const response = await fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/${userid}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
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
        if (!token) {
            return;
        }

        const fetchData = async () => {
            try {
                const userResponse = await fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/id/${userid}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                const userData = await userResponse.json();
                setUser(userData);

                // Fetch favorite movies
                const favoriteMoviesResponse = await fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/${user.Username}/movies`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (favoriteMoviesResponse.ok) {
                    const favoriteMoviesData = await favoriteMoviesResponse.json();
                    setFavoriteMovies(favoriteMoviesData);
                } else {
                    console.error("Failed to fetch favorite movies");
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [token, userid, user.Username]);

    return (
        <Container className="mx-1">
            <Row>
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title>My Profile</Card.Title>
                        {user && (<UserInfo name={user.Username} email={user.Email} />)}
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
                        <Button variant="danger" onClick={handleDeleteAccount} className="mt-3">
                            Delete Account
                        </Button>
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Col className="mb-5" xs={12} md={12}>
                    {favoriteMovies && (<FavouriteMovies user={user} favouriteMovies={favoriteMovies} />)}
                </Col>
            </Row>
        </Container>
    );
};
