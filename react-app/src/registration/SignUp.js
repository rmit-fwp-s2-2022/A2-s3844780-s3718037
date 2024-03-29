import React, { useState } from "react";
import { isEmailRegistered, registerUser, validPassword, validEmail, NAME_REGEX } from "../Util";

export default function SignUp(props) {
    const clearInputs = {
        name: "",
        email: "",
        password: "",
        samePassword: ""
    };
    const [inputs, setInputs] = useState(clearInputs);
    const [errorMessage, setErrorMessage] = useState(null);

    const reset = () => {
        // Reset Modal Inputs
        document.querySelectorAll("#signup-modal input").forEach((input) => input.value = "");

        // Clear error message
        setErrorMessage(null);

        // Reset inputs
        setInputs(clearInputs)
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "name") {
            value = value.replace(NAME_REGEX, "");
            document.querySelector("#signup-name").value = value;
        }

        setInputs({ ...inputs, [name]: value});
    }

    // Run when Form is submitted
    const userSignUp = async (event) => {
        event.preventDefault(); // Prevent page from refreshing/reloading

        const emailLowerCase = inputs.email.toLowerCase();

        const isRegistered = await isEmailRegistered(emailLowerCase);

        // User not yet registered
        if (!isRegistered) {
            if (validEmail(emailLowerCase)) {
                // Has valid password
                if (validPassword(inputs.password)) {
                    // Passwords are the same
                    if (inputs.password === inputs.samePassword) {
                        // Register the user
                        const user = await registerUser(inputs.name, emailLowerCase, inputs.password);

                        reset();

                        // Close the modal
                        document.getElementById("signup-btn-close").click();

                        // Log user in
                        props.userLogin(user);

                    }
                    else
                        setErrorMessage("Password do not match");

                }
                else
                    setErrorMessage("Not a valid password");
            }
            else
                setErrorMessage("Not a valid email address");
        }
        else
            setErrorMessage("Email is already registered");

        // Clear password fields upon submit
        document.querySelector("#signup-modal #signup-password").value = "";
        document.querySelector("#signup-modal #signup-password-again").value = "";
    }

    return (
        <div className="modal fade" id="signup-modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="signup-modal-label">Sign Up</h5>
                        <button type="button" id="signup-btn-close" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={userSignUp}>
                            {errorMessage !== null &&
                                <div className="card text-bg-danger mb-3">
                                    <div className="card-body">
                                        <p className="m-0">Error: {errorMessage}</p>
                                    </div>
                                </div>
                            }
                            <div className="mb-3">
                                <label htmlFor="signup-name" className="form-label">Name</label>
                                <input name="name" type="text" className="form-control" id="signup-name"
                                    onChange={handleInputChange} placeholder="Enter your name"
                                    value={inputs.name} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-email" className="form-label" >Email address</label>
                                <input name="email" type="email" className="form-control" id="signup-email"
                                    onChange={handleInputChange} placeholder="Enter your email address"
                                    value={inputs.email} required />
                            </div>
                            <div>
                                <label htmlFor="signup-password" className="form-label" >New Password</label>
                                <input name="password" type="password" className="form-control" id="signup-password"
                                    onChange={handleInputChange} placeholder="Enter your password"
                                    value={inputs.password} required />
                            </div>
                            <div className="form-text mb-3" id="password-help-block" >
                                <p>
                                Your password must be at least 8 characters long, with at least: one character, one number, and one special character
                                </p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="signup-password-again" className="form-label" >Re-enter Password</label>
                                <input name="samePassword" type="password" className="form-control" id="signup-password-again"
                                    onChange={handleInputChange} placeholder="Re-enter your password"
                                    value={inputs.samePassword} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}