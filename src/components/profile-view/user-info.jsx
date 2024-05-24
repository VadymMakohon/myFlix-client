import React from "react";
import PropTypes from "prop-types";
import { Card } from 'react-bootstrap';

export const UserInfo = ({ email, name }) => {
    return (
        <div>
            <h2>User Info</h2>
            <Card.Text>Username: {name}</Card.Text>
            <Card.Text>Email: {email}</Card.Text>
            <h3>Favorite Movies</h3>
            {/* <ul>
                {favoriteMovies.map(movie => (
                    <li key={movie._id}>{movie.Title}</li>
                ))}
            </ul> */}
        </div>
    );
};
UserInfo.propTypes = {
    email: PropTypes.string,
    name: PropTypes.string,
    favoriteMovies: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            Title: PropTypes.string.isRequired,
            // Add more movie properties as needed
        })
    ).isRequired,
};