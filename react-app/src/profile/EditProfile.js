import React, { useState } from "react";
import { validPassword, validEmail, updateUserProfile, updateProfilePic, NAME_REGEX, isEmailRegistered } from "../Util";

// eslint-disable-next-line no-useless-escape
const IMAGE_URL_PATTERN = "^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$";

export default function EditProfile(props) {

    // Obtain logged in user's details
    const resetInputs = {
        name: props.user.name,
        email: props.user.email,
        password: "",
        samePassword: ""
    };

    const [profileURL, setProfileURL] = useState(null);
    const [inputs, setInputs] = useState(resetInputs);
    const [errorMessage, setErrorMessage] = useState(null);

    const reset = () => {
        setTimeout(() => {
            // Clear password inputs
            document.querySelector("#edit-profile-modal #edit-profile-password").value = "";
            document.querySelector("#edit-profile-modal #edit-profile-password-again").value = "";

            // Clear error message
            setErrorMessage(null);

            // Reset inputs
            setInputs(resetInputs);
        }, 500);
    }

    const handleInputChange = (event) => {
        const name = event.target.name;
        let value = event.target.value;

        if (name === "name") {
            value = value.replace(NAME_REGEX, "");
            document.querySelector("#edit-profile-name").value = value;
        }
        setInputs({ ...inputs, [name]: value });
    }

    const saveProfile = async (event) => {
        event.preventDefault(); // Prevent page from refreshing/reloading
        const emailLowerCase = inputs.email.toLowerCase();

        // Is the email is updated?
        let emailRegistered;
        if (emailLowerCase !== props.user.email)
            // Is email already registered?
            emailRegistered = await isEmailRegistered(emailLowerCase);
        else
            emailRegistered = false;

        if (!emailRegistered) {
            if (validEmail(emailLowerCase)) {
                // Has valid password
                if (validPassword(inputs.password) || inputs.password.length === 0) {
                    // Passwords are the same
                    if (inputs.password === inputs.samePassword || inputs.password.length === 0) {

                        // Update user details
                        await updateUserProfile(props.user.userID, inputs.name, inputs.email, inputs.password);

                        // Update user useState variable
                        props.updateUser();

                        // Reset modal
                        resetInputs.name = inputs.name;
                        resetInputs.email = inputs.email;
                        reset();

                        // Close the modal
                        document.getElementById("edit-profile-btn-close").click();
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
            setErrorMessage("Email address already used");
    }

    const profilePicChange = (event) => {
        const value = event.target.value;
        setProfileURL(value);
    }

    const submitURL = async (event) => {
        event.preventDefault(); // Prevent Refresh

        // Update User
        await updateProfilePic(props.user.userID, profileURL);
        props.updateUser();

        // Reset
        document.querySelector("#edit-profile-pic-form").classList.remove("was-validated");
        document.querySelector("#edit-profile-url").classList.remove("is-valid");
        document.querySelector("#edit-profile-url").value = "";
        setProfileURL(null);
    };

    // Disable form submissions if there are invalid fields
    (() => {
        'use strict'

        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.querySelectorAll('.needs-validation')

        // Loop over them and prevent submission
        Array.prototype.slice.call(forms)
            .forEach((form) => {
                form.addEventListener('submit', (event) => {
                    if (!form.checkValidity()) {
                        event.preventDefault()
                        event.stopPropagation()
                    }

                    form.classList.add('was-validated')
                }, false)
            })
    })()


    return (
        <div className="modal fade" id="edit-profile-modal" data-bs-backdrop="static" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="edit-profile-modal-label">Edit Profile</h5>
                        <button type="button" id="edit-profile-btn-close" onClick={reset} className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body pt-0">
                        {/* Profile Pic */}
                        <div className="text-center">
                            <img className="rounded-circle mx-4 mt-3 mb-2 border" src={props.user.profilePic}
                                style={{ width: "62px", height: "62px" }} />
                        </div>
                        {/* URL Form */}
                        <form onSubmit={submitURL} className="needs-validation" id="edit-profile-pic-form" noValidate>
                            <label htmlFor="edit-profile-url" className="form-label">Profile Picture</label>
                            <div className="input-group mb-3 has-validation">
                                <input type="text" className="form-control" placeholder="Insert URL" role="textbox" aria-label="url-input-field"
                                    onChange={profilePicChange} id="edit-profile-url" pattern={IMAGE_URL_PATTERN} required />
                                <button className="btn btn-success"
                                    style={{ width: "20%" }}>Confirm</button>
                                <div className="invalid-feedback">
                                    Please enter a valid Image URL
                                </div>
                            </div>
                        </form>
                        <div className="border-top pt-2">
                            {/* Information Form */}
                            <form onSubmit={saveProfile}>
                                {errorMessage !== null &&
                                    <div className="card text-bg-danger mb-3">
                                        <div className="card-body">
                                            <p className="m-0">Error: {errorMessage}</p>
                                        </div>
                                    </div>
                                }
                                <div className="mb-3">
                                    <label htmlFor="edit-profile-name" className="form-label">Name</label>
                                    <input name="name" type="text" className="form-control" id="edit-profile-name"
                                        onChange={handleInputChange} value={inputs.name} placeholder="Enter your name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edit-profile-email" className="form-label" >Email address</label>
                                    <input name="email" type="email" className="form-control" id="edit-profile-email"
                                        onChange={handleInputChange} value={inputs.email} placeholder="Enter your email address" required />
                                </div>
                                <div>
                                    <label htmlFor="edit-profile-password" className="form-label" >Change Password</label>
                                    <input name="password" type="password" className="form-control" id="edit-profile-password"
                                        onChange={handleInputChange} placeholder="Enter your new password" />
                                </div>
                                <div className="form-text mb-3" id="password-help-block" >
                                    <p>
                                        Your password must be at least 8 characters long, with at least: one character, one number, and one special character
                                    </p>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edit-profile-password-again" className="form-label" >Re-enter Password</label>
                                    <input name="samePassword" type="password" className="form-control" id="edit-profile-password-again"
                                        onChange={handleInputChange} placeholder="Re-enter your new password" />
                                </div>
                                <button type="submit" className="btn btn-primary">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}