import React, { useEffect, useState } from "react";
import { getUser } from "../data/repository";

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

    console.log(props)
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
                                    <button className="btn btn-danger">Remove Post</button>
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
                                <img src={props.postPic} className="card-img-top" alt="..." />
                                <div className="mt-3">
                                    <button className="btn btn-primary mx-4">Block User</button>
                                    <button className="btn btn-danger">Remove Post</button>
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}