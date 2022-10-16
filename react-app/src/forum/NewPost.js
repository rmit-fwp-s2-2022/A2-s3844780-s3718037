import React, { useState } from "react";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import CloseIcon from '@material-ui/icons/Close';
import { getUserInfo } from "../Util";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default function NewPost(props) {

    const [post, setPost] = useState("")
    const [errorMessage, setErrorMessage] = useState(null)

    // Form submit logic.
    const handleSubmit = (e) => {
        // Trim the post text. Remove all HTML elements using a regex.
        const postTrimmed = post.replace(/<(.|\n)*?>/g, "").trim()

        // Set error if post is empty.
        if (post.replace(/<(.|\n)*?>/g, "").trim().length === 0) {
            setErrorMessage("You cannot submit a post without a message.");
            return;
        }
        // Set error if post exceeds 600 characters.
        if (postTrimmed.length > 600) {
            const overLimit = postTrimmed.length - 600
            const characterPostfix = overLimit === 1 ? "character" : "characters"
            setErrorMessage("You cannot submit a post that exceeds 600 characters. You are " + overLimit + " " + characterPostfix + " over.")
            return
        }
        // Pass post message to parent component
        props.passPostMSG(post);
        // Reset post content and error message.
        setPost("")
        setErrorMessage(null)
    }

    // Make the 'Enter' keypress submit the form.
    function onkeydown(e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            // Stop the 'Enter' key from creating a line-break in the textarea.
            e.preventDefault()
            // Handle form inputs 
            handleSubmit()
        }
    };

    // // Obtain user to display profile picture
    // const user = getUserInfo()



    return (
        <div className="container mt-3 mb-3">
            <form>
                {/* Error message */}
                <div className=" mx-auto thread-card border-0 mb-3">
                    {errorMessage !== null &&
                        <div className="card text-bg-danger mb-3 error-message">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-11">
                                        <p className="m-0 p-1"><span className="error-message-text">Error:</span> {errorMessage}</p>
                                    </div>
                                    <div className="col-sm-1">
                                        <div className="icon-button">
                                            <CloseIcon onClick={() => { setErrorMessage(null) }} style={{ color: 'white', fontSize: 30 }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
                <div className="card mx-auto thread-card border-0">
                    {/* Profile picture */}
                    <div className="row">
                        <div className="col-sm-1">
                            <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={props.profilePic} alt="Profile" />
                        </div>
                        {/* Message textarea */}
                        <div className="col-sm-10 main-textarea">
                            <div className="card-body mx-4 mt-1 main-textarea">
                                <ReactQuill id="newPost" className="form-control" name="post" value={post} onChange={setPost} onKeyDown={onkeydown} style={{ height: "68px" }} theme="bubble" placeholder="Post a message..." />
                            </div>
                        </div>
                        {/* Upload image section */}
                        <div className="col-sm-1 camera-icon">
                            <div className="card-body thread-card-body">
                                <div className="icon-button">
                                    <PhotoCameraIcon data-bs-toggle="modal" data-bs-target="#image-add-modal" style={{ color: 'black', fontSize: 35 }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}


