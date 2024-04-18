import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: 1,
            title: 'La Femme Nikita',
            description: 'Is a 1990 French-language action thriller film written and directed by Luc Besson.A teen criminal who is convicted and sentenced to life imprisonment for murdering policemen during an armed pharmacy robbery. Her government handlers fake her death and recruit her as a professional assassin. After intense training, she starts a career as a killer, where she struggles to balance her work with her personal life. She shows talent at this and her career progresses until a mission in an embassy goes awry.',
            genre: ['Action'],
            director: 'Luc Besson',
            image: 'https://media.themoviedb.org/t/p/original/owzoJZoIIRgRyAbr8rx78wkCJaj.jpg',
            featured: true

        },
        {
            id: 2,
            title: 'The Matrix',
            description: 'The Wachowskis groundbreaking science fiction film that explores the concept of reality and identity within a simulated world. A mind-bending adventure that questions the nature of existence.',
            genre: ['Science Fiction'],
            director: 'Quentin Tarantino',
            image: 'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg',
            featured: true
        },
        {
            id: 3,
            title: 'Inception',
            description: 'Inception is a mind-bending science fiction thriller directed by Christopher Nolan. The film explores the concept of dreams within dreams, taking the audience on a visually stunning and intellectually stimulating journey through layers of subconsciousness.',
            genre: ['Science Fiction'],
            director: 'Christopher Nolan',
            image: 'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg',
            featured: true
        },
        {
            id: 4,
            title: 'The Dark Knight',
            description: 'A gripping superhero film directed by Christopher Nolan, delving into the complexities of justice and morality.',
            genre: 'Action',
            director: 'Christopher Nolan',
            image: 'https://m.media-amazon.com/images/I/91KkWf50SoL._AC_UF894,1000_QL80_.jpg',
            featured: true
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    if (selectedMovie) {
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