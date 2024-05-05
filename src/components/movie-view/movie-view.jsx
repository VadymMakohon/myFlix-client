import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();

    const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <div>
                <img src={movie.image} style={{ height: 'auto' }} className="w-100" alt="Movie Poster" />
            </div>
            <div>
                <span style={{ fontWeight: 'bold' }}>Title: </span>
                <span style={{ fontWeight: 'bold' }}>{movie.title}</span>
            </div>
            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span>{movie.genre}</span>
            </div>
            <div>
                <span>Director: </span>
                <span>{movie.director}</span>
            </div>
            <div>
                <span>Featured: </span>
                <span>{movie.featured ? "True" : "False"}</span>
            </div>
            <Link to={`/`}>
                <button className="back-button" >Back</button>
            </Link>
        </div>
    );
};

// MovieView.propTypes = {
//     movie: PropTypes.shape({
//         title: PropTypes.string.isRequired,
//         image: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//         genre: PropTypes.string.isRequired,
//         director: PropTypes.string.isRequired,
//         featured: PropTypes.bool
//     }).isRequired,
//     onBackClick: PropTypes.func.isRequired
// };