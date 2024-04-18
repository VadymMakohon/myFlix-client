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
            title: 'Inception',
            description: 'Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with his wife, Emma Thomas. Dom Cobb, a professional thief, steals information by infiltrating the subconscious of his targets. He is offered a chance to have his criminal history erased as payment for the implantation of another person\'s idea into a target\'s subconscious.',
            genre: ['Action', 'Sci-Fi'],
            director: 'Christopher Nolan',
            image: 'https://media.themoviedb.org/t/p/original/sUTfSTpMkJBkWdHw99z4goKHKkL.jpg',
            featured: false
        },
        {
            id: 3,
            title: 'The Shawshank Redemption',
            description: 'The Shawshank Redemption is a 1994 American drama film written and directed by Frank Darabont, based on the 1982 Stephen King novella Rita Hayworth and Shawshank Redemption. Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            genre: ['Drama'],
            director: 'Frank Darabont',
            image: 'https://media.themoviedb.org/t/p/original/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg',
            featured: false
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