import React, { useEffect, useState } from "react";
import { updatePost } from "../Util";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function EditPost(props) {

    // Get and set current thread
    const [thread, setThread] = useState("");
    // Obtain post image
    const [postURL, setPostURL] = useState("");
    // Obtain post message
    const [postMSG, setPostMSG] = useState(null);

    // Initialise default values of post and URL fields
    useEffect(() => {
        setPostMSG(props.post)
        setPostURL(props.postPic)
    }, []);

    // Obtain and set postURL
    const inputChange = (event) => {
        setPostURL(event.target.value)
    }

    // Initiate update thread in database
    const editThread = (event) => {
        // Prevent page from refreshing/reloading
        event.preventDefault();

        // Trim the post text. Remove all HTML elements using a regex.
        const postTrimmed = postMSG.replace(/<(.|\n)*?>/g, "").trim()

        // Set error if post is empty.
        if (postMSG.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
            return;
        }
        // Set error if post exceeds 600 characters.
        if (postTrimmed.length > 600) {
            return
        }

        // Copy fields to be query updated
        const copyInputs = { ...thread }
        copyInputs["post"] = postMSG
        copyInputs["postPic"] = postURL

        setThread(copyInputs)
        // Update the post
        updatePost(props.threadID, copyInputs.post, copyInputs.postPic)
        // Close the modal
        const closeBTN = "edit-post-btn-close" + props.threadID
        document.getElementById(closeBTN).click();
        // Pass inputs to parent component
        props.passPost(copyInputs)
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
                                {thread === null || thread === undefined ? <div></div> :
                                    < ReactQuill className="form-control" name="post" value={postMSG} onChange={value => setPostMSG(value)} style={{ height: "68px" }} theme="bubble" placeholder="Post a message..." />
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="postPic" className="form-label" >Edit Image URL</label>
                                {thread === null || thread === undefined ? <div></div> :
                                    <input name="postPic" type="url" className="form-control" id="edit-post-link" onChange={inputChange} defaultValue={postURL} placeholder="Please enter the URL of an image..." />
                                }
                            </div>
                            <div className="modal-footer px-0 py-0 border-0">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                                <button type="submit" className="btn btn-secondary">Edit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}