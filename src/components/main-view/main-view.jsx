import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    if (!token) {
        return;
    }

    useEffect(() => {
        fetch("https://myflix-2024-e9df13718d8a.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Movies data: ", movie);
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        genre: movie.Genre.Name,
                        description: movie.Description,
                        director: movie.Director.Name,
                        image: movie.ImagePath

                    };
                });
                setMovies(moviesFromApi);

            });
    }, [token]);

    if (!user) {
        return (
            <>
                <LoginView onLoggedIn={(user, token) => { setUser(user); setToken(token) }} />
                or
                <SignupView />
            </>
        )
    }

    if (selectedMovie) {
        // console.log(selectedMovie);
        return (
            <MovieView movie={selectedMovie}
                onBackClick={() => setSelectedMovie(null)} />
        );
    };

    if (movies.length === 0) {
        return <div>The list is empty</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
            <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </div>
    );
};