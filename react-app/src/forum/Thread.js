import React, { useState, useEffect } from "react";
import { getUserByID, newComment, getCommentsByID } from "../Util";
import { useNavigate } from "react-router-dom";
import Comment from "./Comment";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import EditPost from "./EditPost";
import DeletePost from "./DeletePost";

export default function Thread(props) {

    // Used for updating individual comments
    const [comment, setComment] = useState("")
    // Get and set all comments
    const [comments, setComments] = useState("");
    const [errorMessage, setErrorMessage] = useState(null)
    const [user, setUser] = useState(null)
    // Allow comments to be returned before displaying them
    const [isLoading, setIsLoading] = useState(true);
    // Allow comments to re-render upon new comment
    const [change, setChange] = useState(false);

    const navigate = useNavigate();

    // Fill form elements with current thread data.
    const resetInputs = {
        post: props.post,
        postPic: props.postPic
    };

    // Controls inputs that are displayed
    const [inputs, setInputs] = useState(resetInputs)
    // Supports hide/show component
    const [showThread, setShowThread] = useState(true)

    useEffect(() => {
        setShowThread(true)
    }, [props]);

    // Obtain user by ID
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserByID(props.userID)
            setUser(user)
        }
        fetchUser()
    }, [])

    // Update change state
    const handleClick = event => {
        setChange(true);
    };

    // Get all comments by thread ID
    useEffect(() => {
        async function loadComments() {
            const allComments = await getCommentsByID(props.threadID);

            setComments(allComments);
            setIsLoading(false);
        }
        loadComments();
        // Reset change useState
        setChange(false)
    }, [change]);

    // Hide the component if the thread was deleted.
    if (showThread === false) {
        return null
    }

    // Update the current comment from textarea's input.
    const handleInputChange = (event) => {
        setComment(event.target.value)
    }

    // Create a new comment
    const userComment = (event) => {
        // Prevent page from refreshing/reloading
        event.preventDefault();

        // Trim the post text.
        const commentTrimmed = comment.trim()

        // Set error if post is empty.
        if (commentTrimmed === "") {
            setErrorMessage("Comment cannot be left blank.")
            return
        }

        // Set error if post exceeds 600 characters.
        if (commentTrimmed.length > 600) {
            const overLimit = commentTrimmed.length - 600
            const characterPostfix = overLimit === 1 ? "character" : "characters"
            setErrorMessage("You are " + overLimit + " " + characterPostfix + " over the character limit.")
            return
        }

        // Create a new comment
        newComment(props.threadID, commentTrimmed)

        // Reset post content and error message.
        setComment("")
        setErrorMessage(null)
    }

    // View Profile of User
    const viewProfile = (event) => {
        event.preventDefault();
        navigate("/profile", { state: { user: user } });
    }


    return (
        <>
            {/* Edit thread */}
            <EditPost threadID={props.threadID} passPost={setInputs} />
            {/* Delete thread */}
            <DeletePost threadID={props.threadID} passShowThread={setShowThread} />
            <div className="container mb-3">
                <div className="card mx-auto thread-card border-0" style={{ width: '800px' }}>
                    {/* Start of thread row */}
                    <div className="row">
                        <div className="col-sm-1">
                            <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={user != null ? user.profilePic : ""} />
                        </div>
                        <div className="col-sm-11 main-textarea">
                            <div className="card-body mx-5 mt-1 thread-body">
                                <h5 className="card-title pt-1">{user != null ?
                                    <a href="" onClick={viewProfile} className="profile-link"
                                    >{user.name}</a> : ""}
                                    <span className="text-muted thread-date"> · {props.postDate}  </span>
                                    <EditIcon className="icon-button" data-bs-toggle="modal" data-bs-target={"#edit-post-modal" + props.threadID} style={{ color: 'grey', fontSize: 20 }} />
                                    <DeleteIcon className="icon-button" data-bs-toggle="modal" data-bs-target={"#delete-post-modal" + props.threadID} style={{ color: 'grey', fontSize: 20 }} />
                                </h5>
                                <p className="card-subtitle pt-1">{inputs.post}</p>
                                {
                                    inputs.postPic === null || inputs.postPic === undefined || inputs.postPic === "" ? "" :
                                        <img className="border rounded post-image" src={inputs.postPic} />
                                }
                            </div>
                        </div>
                    </div>
                    <hr />
                    {/* Comments */}
                    {
                        comments === null || comments === undefined ? "" :
                            isLoading ? <div></div> :
                                comments.map((comment) =>
                                    <Comment
                                        key={comment.commentID}
                                        commentID={comment.commentID}
                                        userID={comment.userID}
                                        threadID={comment.threadID}
                                        commentText={comment.commentText}
                                        postDate={comment.postDate}
                                    />
                                )
                    }
                    {/* End of thread row */}
                    <form onSubmit={userComment}>
                        <div className="row">
                            <div className="col-sm-10 main-textarea">
                                <div className="card-body mx-2 pt-0">
                                    <h6 className="card-title reply-label">Add a reply
                                        {errorMessage !== null && <span className="error-comment-text">{'\u00A0'}{'\u00A0'} Error: {errorMessage}</span>}
                                    </h6>
                                    <textarea name="comment" value={comment} onChange={handleInputChange} className="form-control" placeholder="Post a message..." rows="1" />
                                </div>
                            </div>
                            <div className="col-sm-2">
                                <button type="submit" onClick={handleClick} className="btn btn-secondary post-button px-4">Post</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
