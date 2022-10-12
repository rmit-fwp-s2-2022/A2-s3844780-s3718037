import React, { useState } from "react";
import { getThreadsByID, updatePost } from "../Util";

export default function EditPost(props) {

    // Obtain thread by ID
    const thread = getThreadsByID(props.threadID)

    // Fill form elements with current thread data.
    const resetInputs = {
        post: thread.post,
        postPic: thread.postPic
    };

    const [inputs, setInputs] = useState(resetInputs)

    // Obtain and set current state of inputs
    const inputChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        const copyInputs = { ...inputs }
        copyInputs[name] = value
        setInputs(copyInputs)
    }

    const editThread = (event) => {
        // Prevent page from refreshing/reloading
        event.preventDefault();

        // Update the post
        updatePost(props.threadID, inputs.post, inputs.postPic)

        // Close the modal
        const closeBTN = "edit-post-btn-close" + props.threadID
        document.getElementById(closeBTN).click();

        // Pass inputs to parent component
        props.passPost(inputs)
    }

    return (
        <div className="modal fade" id={"edit-post-modal" + props.threadID} data-bs-backdrop="static" tabIndex="-1" >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="edit-post-modal-label">Edit Post</h5>
                        <button type="button" id={"edit-post-btn-close" + props.threadID} className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={editThread}>
                            <div className="mb-3">
                                <label htmlFor="post" className="form-label" >Edit Text</label>
                                <textarea name="post" id="post" defaultValue={inputs.post} className="form-control" placeholder="Post a message..." rows="2" onChange={inputChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postPic" className="form-label" >Edit Image URL</label>
                                <input name="postPic" type="url" className="form-control" id="edit-post-link" onChange={inputChange} defaultValue={inputs.postPic} placeholder="Please enter the URL of an image..." />
                            </div>
                            <div className="modal-footer px-0 py-0 border-0">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-secondary">Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}