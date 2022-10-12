import React, { useState, useEffect } from "react";
import { getUserByID } from "../Util";

export default function Comment(props) {

    // Get and set individual user related to comment
    const [user, setUser] = useState(null)
    // Allow user data to be returned before displaying them
    const [isLoading, setIsLoading] = useState(true);

    // Obtain user by ID
    //setUser(getUserByID(props.userID))

    // Obtain user by ID
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserByID(props.userID)
            setUser(user)
            setIsLoading(false);
        }
        fetchUser()
    }, [])


    // console.log("test1")
    // console.log(props.userID)
    // console.log("test2")
    // console.log(user.name)


    return (
        <>
            {/* Comment example - TODO Refactor into own component */}
            {isLoading ? <div></div> :
                <div className="row">
                    <div className="col-sm-1">
                        <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={user.profilePic} />
                    </div>
                    <div className="col-sm-11 main-textarea">
                        <div className="card-body mx-5 mt-1 thread-body">
                            <h5 className="card-title pt-1">{user.name}<span className="text-muted thread-date"> · {props.postDate}</span></h5>
                            <p className="card-subtitle pt-1">{props.commentText}</p>
                        </div>
                    </div>
                </div>
            }
            <hr />
        </>
    )
}
