import React, { useEffect, useState } from "react";
import { getUser, updateThread, updateComment } from "../data/repository";

export default function PostCard(props) {

    // Allow threads to re-render upon new thread
    const [change, setChange] = useState(false);
    // Allow posts to be returned before displaying them
    const [isLoading, setIsLoading] = useState(true);
    // Obtain user of post
    const [user, setUser] = useState("");

    // Obtain user by ID
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUser(props.userID)
            setUser(user)
        }
        fetchUser()
    }, [])

    // Reset change
    useEffect(() => {
        setChange(false)
    }, [change]);

    // Update change state
    const removeComment = async () => {
        // Hide posts while loading.
        setIsLoading(true);

        const comment = { ...props }
        comment.commentText = "[**** This post has been deleted by the admin ***]"
        // Update comment.
        await updateComment(comment);

        // Update state to cause threads to be re-rendered
        setChange(true)
    };

    // Update change state
    const removeThread = async () => {
        // Hide posts while loading.
        setIsLoading(true);
        const thread = { ...props }
        thread.post = "[**** This post has been deleted by the admin ***]"
        // Update comment.
        await updateThread(thread);
        // Update state to cause threads to be re-rendered
        setChange(true)
    };


    return (
        <>
            {
                // If post is a thread
                props.hasOwnProperty("commentText") ?
                    // If post is a comment
                    <div className="col my-4">
                        <div className="card m-auto text-start" style={{ width: "20rem", minHeight: "300px" }}>
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <div className="card-subtitle pt-1" dangerouslySetInnerHTML={{ __html: props.commentText }} />
                                <div className="mt-3">
                                    <button className="btn btn-primary mx-4">Block User</button>
                                    <button className="btn btn-danger" onClick={() => removeComment()} >Remove Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="col my-4">
                        <div className="card m-auto text-start" style={{ width: "20rem", minHeight: "300px" }}>
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <div className="card-subtitle pt-1" dangerouslySetInnerHTML={{ __html: props.post }} />
                                {props.postPic !== "" ?
                                    <img src={props.postPic} className="card-img-top" alt="..." />
                                    : <div></div>}
                                <div className="mt-3">
                                    <button className="btn btn-primary mx-4">Block User</button>
                                    <button className="btn btn-danger" onClick={() => removeThread()} >Remove Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}