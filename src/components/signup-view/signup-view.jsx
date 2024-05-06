import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const SignupView = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: username,
            Password: password,
            Email: email,
            BirthDate: birthday
        };

        fetch("https://myflix-2024-e9df13718d8a.herokuapp.com/users", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                response.json().then((errorData) => {
                    console.error("Signup failed:", errorData);
                    alert("Signup failed: " + errorData.message); // Or whatever property contains the error message
                });
            }
        }).catch((error) => {
            console.error("Signup error:", error);
            alert("Something went wrong. Please try again later.");
        });
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="signUpFormUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    minLength="3"
                    className="mb-4"
                    required
                />
            </Form.Group>

            <Form.Group controlId="signUpFormPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mb-4"
                    required
                />
            </Form.Group>
            <Form.Group controlId="signUpFormEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-4"
                    required
                />
            </Form.Group>
            <Form.Group controlId="signUpFormBirthday">
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="mb-4"
                    required
                />
            </Form.Group>
            {/* Apply inline style to the button */}
            <Button variant="primary" type="submit" style={{ backgroundColor: "#40E0D0" }}>
                Submit
            </Button>
        </Form>
    );
};
