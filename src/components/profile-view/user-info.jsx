import React from "react"

export const UserInfo = ({ email, name }) => {
    return (
        <div>
            <p>Username: {name} </p>
            <p>Email: {email} </p>
        </div>
    )
}