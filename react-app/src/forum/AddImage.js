import React, { useState } from "react";

export default function AddImage(props) {

    const [inputs, setInputs] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    // Clear the URL input box
    function reset() {
        // Reset inputs
        setInputs("")
        // Clear image link input
        document.querySelector("#image-add-modal #image-add-link").value = ""
        // Clear error message
        setErrorMessage(null)
    }

    // Obtain and set current state of URL input
    const inputChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        const copyInputs = { ...inputs }
        copyInputs[name] = value
        setInputs(copyInputs)
    }

    const addImage = (event) => {
        // Prevent page from refreshing/reloading
        event.preventDefault();
        // Reset modal
        reset()
        // Pass image URL to parent component
        props.passPostURL(inputs.imageURL);
        // Close the modal
        document.getElementById("image-add-btn-close").click();
    }

    return (
        <div className="modal fade" id="image-add-modal" data-bs-backdrop="static" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="image-add-modal-label">Upload an Image</h5>
                        <button type="button" id="image-add-btn-close" onClick={reset} className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={addImage}>
                            {errorMessage !== null &&
                                <div className="card text-bg-danger mb-3">
                                    <div className="card-body">
                                        <p className="m-0">Error: {errorMessage}</p>
                                    </div>
                                </div>
                            }
                            <div className="mb-3">
                                <label htmlFor="imageURL" className="form-label" >Image URL</label>
                                <input name="imageURL" type="url" className="form-control" id="image-add-link"
                                    onChange={inputChange} value={inputs.url} placeholder="Please enter the URL of an image..." required />
                            </div>
                            <div className="modal-footer px-0 py-0 border-0">
                                <button type="button" className="btn btn-danger" onClick={reset} data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-secondary">Upload</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}