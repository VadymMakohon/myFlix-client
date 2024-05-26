import React from "react";
import PropTypes from "prop-types";
import { Card } from 'react-bootstrap';

export const UserInfo = ({ email, name }) => {
    return (
        <div>
            <h2>User Info</h2>
            <Card.Text>Username: {name}</Card.Text>
            <Card.Text>Email: {email}</Card.Text>
        </div>
    );
};

UserInfo.propTypes = {
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};
