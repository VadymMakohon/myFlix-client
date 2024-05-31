import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflix-2024-e9df13718d8a.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch movies");
                }
                return response.json();
            })
            .then((data) => {
                const moviesFromApi = data.map((data) => ({
                    id: data._id,
                    Title: data.Title,
                    Image: data.ImagePath,
                    Description: data.Description,
                    Genre: data.Genre,
                    Director: data.Director,
                    Featured: data.Featured
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
                // Provide feedback to the user
                // For example, show a message or redirect to an error page
            });
    }, [token]);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    setToken(null);
                    localStorage.clear();
                }}
            />
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView />
                                </Col>
                            )
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <LoginView onLoggedIn={(user) => setUser(user)} />
                                </Col>
                            )
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                <Col md={8}>
                                    <MovieView movies={movies} />
                                </Col>
                            )
                        }
                    />
                    <Route
                        path="/"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : movies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                movies.map((movie) => (
                                    <Col className="mb-5" key={movie.id} md={3} sm={12}>
                                        <MovieCard
                                            movie={movie}
                                            isFavorite={user.FavoriteMovies.includes(movie.id)}
                                            updateUser={updateUser}
                                        />
                                    </Col>
                                ))
                            )
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            !user ? (
                                <Navigate to="/login" replace />
                            ) : (
                                <Col md={8}>
                                    <ProfileView localUser={user} movies={movies} token={token} />
                                </Col>
                            )
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
