import React, { useEffect, useState } from "react";
import { UserInfo } from "./user-info";
import { Button, Card, Container, FormLabel } from 'react-bootstrap';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FavouriteMovies } from "./favourite-movies";
import { UpdateUser } from "./update-user";
import Form from "react-bootstrap/Form";
import "./profile-view.scss";

export const ProfileView = ({ localUser, movies, token }) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    const [username, setUsername] = useState(storedUser.Username);
    const [email, setEmail] = useState(storedUser.email);
    const [password, setPassword] = useState(storedUser.password);
    const [birthDate, setBirthdate] = useState(storedUser.birthDate);
    const [user, setUser] = useState({});
    const [userid, setUserid] = useState(storedUser._id);
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const handleSubmit = async (event) => {
        const formData = {
            Username: username,
            Email: email,
            Password: password
        };
        console.log(formData)
        event.preventDefault(event);

        fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/${userid}`, {
            method: "PUT",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => {
                if (response.ok) {
                    alert("Update successful");
                    window.location.reload();

                    return response.json()
                }
            })

            .then((user) => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));
                    setUser(user)
                }
            })
            .catch((error) => {
                console.error(error);
                alert("Update failed");
            });
    };

    const handleUpdate = (e) => {
        switch (e.target.type) {
            case "text":
                setUsername(e.target.value);
                break;
            case "email":
                setEmail(e.target.value);
                break;
            case "password":
                setPassword(e.target.value);
                break;
            case "date":
                setBirthdate(e.target.value);
                break; // Add break statement
            default:
                break; // Ensure default case has a break statement
        }
    };

    const handleDeleteAccount = () => {
        fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/${userid}`, { // Use user.id
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Account deleted successfully.");
                localStorage.clear();
                // Redirect the user or update state instead of reloading the page
            } else {
                alert("Something went wrong.");
            }
        });
    };

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch(`https://myflix-2024-e9df13718d8a.herokuapp.com/users/id/${userid}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                const usersFromApi = {
                    id: data._id,
                    Username: data.Username,
                    Password: data.Password,
                    Email: data.Email,
                    BirthDate: data.BirthDate,
                    FavoriteMovies: data.FavoriteMovies
                };
                setUser(usersFromApi);

                console.log("User Result Data: " + usersFromApi.Username);
                setFavoriteMovies(movies.filter(m => data.FavoriteMovies.includes(m._id)));
            })
            .catch((error) => {
                console.error(error);
            });
    }, [token]);

    return (
        <Container className="mx-1">
            <Row>
                <Card className="mb-5">
                    <Card.Body>
                        <Card.Title>My Profile</Card.Title>
                        {
                            user && (<UserInfo name={user.Username} email={user.Email} />)
                        }
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
                            <Form.Group controlId="formPassword">
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
                        <Button variant="danger" onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                    </Card.Body>
                </Card>
            </Row>
            <Row>
                <Col className="mb-5" xs={12} md={12}>
                    {
                        favoriteMovies && (<FavouriteMovies user={user} favouriteMovies={favoriteMovies} />)
                    }
                </Col>
            </Row>
        </Container>
    )
}
