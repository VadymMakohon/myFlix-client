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
    const [searchQuery, setSearchQuery] = useState("");

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
                const moviesFromApi = data.map((movie) => ({
                    id: movie._id,
                    Title: movie.Title,
                    ImagePath: movie.ImagePath,
                    Description: movie.Description,
                    Genre: movie.Genre,
                    Director: movie.Director,
                    Featured: movie.Featured
                }));
                setMovies(moviesFromApi);
            })
            .catch((error) => {
                console.error("Error fetching movies:", error);
            });
    }, [token]);

    const updateUser = (updatedUser) => {
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const handleSearch = (event) => {
        event.preventDefault();
    };

    const filteredMovies = movies.filter((movie) => {
        const searchLower = searchQuery.toLowerCase();
        const titleMatch = movie.Title.toLowerCase().includes(searchLower);
        const genreMatch = movie.Genre.Name.toLowerCase().includes(searchLower);
        const directorMatch = movie.Director.Name.toLowerCase().includes(searchLower);
        return titleMatch || genreMatch || directorMatch;
    });

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
                <Col md={8}>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for a movie by title, genre, or director"
                        />
                        <button type="submit">Search</button>
                    </form>
                </Col>
            </Row>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            user ? (
                                <Navigate to="/" />
                            ) : (
                                <Col md={5}>
                                    <SignupView onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                        localStorage.setItem('user', JSON.stringify(user));
                                        localStorage.setItem('token', token);
                                    }} />
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
                                    <LoginView onLoggedIn={(user, token) => {
                                        setUser(user);
                                        setToken(token);
                                        localStorage.setItem('user', JSON.stringify(user));
                                        localStorage.setItem('token', token);
                                    }} />
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
                            ) : filteredMovies.length === 0 ? (
                                <Col>The list is empty!</Col>
                            ) : (
                                filteredMovies.map((movie) => (
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
                                    <ProfileView localUser={user} movies={movies} token={token} updateUser={updateUser} />
                                </Col>
                            )
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};