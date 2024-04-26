import React, { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflix-2024-e9df13718d8a.herokuapp.com/movies")
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        title: movie.Title,
                        genre: movie.Genre,
                        description: movie.Description,
                        director: movie.Director,
                        image: movie.ImagePath

                    };
                });
                setMovies(moviesFromApi);

            });
    }, []);

    if (selectedMovie) {
        const directorName = directors.filter((director) => director.id === selectedMovie.director);
        selectedMovie.director = directorName[0].name;

        return (
            <MovieView
                movie={selectedMovie}
                onBackClick={() => {
                    setSelectedMovie(null);
                }}
            />
        );
    }

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }
    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};