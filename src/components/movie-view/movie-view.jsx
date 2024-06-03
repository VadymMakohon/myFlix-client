import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    return (
        <div>
            <div>
                <img
                    src={movie.ImagePath}
                    className="img-fluid justify-content-md-center"
                    alt="Movie Poster"
                />
            </div>
            <div>
                <span style={{ fontWeight: "bold" }}>Title: </span>
                <span style={{ fontWeight: "bold" }}>{movie.Title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
            </div>
            <div>
                <span>Director Name: {movie.Director.Name}</span>
                <p><strong>Bio: </strong>{movie.Director.Bio}</p>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie.Featured ? "True" : "False"}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};
