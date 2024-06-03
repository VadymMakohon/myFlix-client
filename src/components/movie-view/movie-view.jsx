import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    if (!movie) {
        return <div>Movie not found</div>;
    }

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        if (isNaN(date)) return "N/A"; // Handle invalid date
        return date.toLocaleDateString(undefined, options);
    };

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
                <span>Featured: </span>
                <span>{movie.Featured ? "True" : "False"}</span>
            </div>
            <div>
                <span> <strong>Director Name: </strong>{movie.Director.Name} </span>
                <p><strong>Bio: </strong>{movie.Director.Bio}</p>
                <p><strong>Birth: </strong>{formatDate(movie.Director.Birth)}</p>
                <p><strong>Death: </strong>{movie.Director.Death ? formatDate(movie.Director.Death) : "N/A"}</p>
            </div>
            <Link to={`/`}>
                <button className="back-button">Back</button>
            </Link>
        </div>
    );
};