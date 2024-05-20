import React from "react";
import { Card } from 'react-bootstrap';

export const UserInfo = ({ email, name }) => {
    return (
        <div>
            <Card.Text>username: {name}</Card.Text>
            <Card.Text>email: {email}</Card.Text>
        </div>
    );
};
