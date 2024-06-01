import React from 'react'
import PropTypes from "prop-types";

export const UserInfo = ({ email, name }) => {
    return (
        <div>
            <p>Username: {name} </p>
            <p>Email: {email} </p>
        </div>
    )
}

UserInfo.propTypes = {
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
};