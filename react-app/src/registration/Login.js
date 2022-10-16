import React, { useState } from "react";
import { isEmailRegistered, verifyUser } from "../Util";
import { Modal } from 'bootstrap';

export default function Login(props) {
    const clearInputs = {
        email: "",
        password: "",
    };
    const [inputs, setInputs] = useState(clearInputs);
    const [errorMessage, setErrorMessage] = useState(null);

    const reset = () => {
        // Reset password input
        document.querySelector("#login-password").value = "";

        // Clear error message
        setErrorMessage(null);

        // Reset inputs (keep email)
        clearInputs.email = inputs.email;
        setInputs(clearInputs);
    }

    const handleInputChange = (event) => {
        setInputs({ ...inputs, [event.target.name]: event.target.value });
    }

    const userLogin = async (event) => {
        event.preventDefault(); // Prevent page from refreshing/reloading

        const emailRegistered = await isEmailRegistered(inputs.email.toLowerCase());

        if (emailRegistered) {
            const user = await verifyUser(inputs.email.toLowerCase(), inputs.password);

            if (!user.blocked) {
                if (user !== null) {
                    // Close Login Modal
                    document.getElementById("login-btn-close").click();

                    props.setUserLoginData(user);

                    setTimeout(() => reset(), 500);

                    // Open MFA Modal
                    const MFAModal = new Modal(document.getElementById("mfa-modal"));
                    MFAModal.show();

                }
                else
                    setErrorMessage("Invalid email address and / or password");
            }
            else
                setErrorMessage("Account blocked by Admin. Please contact the support team")
        }
        else
            setErrorMessage("Invalid email address and / or password");
    }

    return (
        <div className="modal fade" id="login-modal" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="login-modal-label">Login</h5>
                        <button type="button" id="login-btn-close" className="btn-close" data-bs-dismiss="modal" ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={userLogin}>
                            {errorMessage !== null &&
                                <div className="card text-bg-danger mb-3">
                                    <div className="card-body">
                                        <p className="m-0">Error: {errorMessage}</p>
                                    </div>
                                </div>
                            }
                            <div className="mb-3">
                                <label htmlFor="login-email" className="form-label" >Email address</label>
                                <input name="email" type="email" className="form-control" id="login-email"
                                    onChange={handleInputChange} placeholder="Enter your email address" required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="login-password" className="form-label" >Password</label>
                                <input name="password" type="password" className="form-control" id="login-password"
                                    onChange={handleInputChange} placeholder="Enter your password" required />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}