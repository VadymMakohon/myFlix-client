import React from "react";

export const UserInfo = ({ email, name }) => {
    return (
        <div>
            <p>username: {name} </p>
            <p>email: {email} </p>
        </div>
    );
};
