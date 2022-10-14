import React, { useState, useEffect } from "react";
import { getUserByID, dateFormatter } from "../Util";

export default function Comment(props) {

    // Get and set individual user related to comment
    const [user, setUser] = useState(null)
    // Allow user data to be returned before displaying them
    const [isLoading, setIsLoading] = useState(true);

    // Obtain user by ID
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserByID(props.userID)
            setUser(user)
            setIsLoading(false);
        }
        fetchUser()
    }, [])


    return (
        <>
            {/* Comment example - TODO Refactor into own component */}
            {isLoading ? <div></div> :
                <div className="row">
                    <div className="col-sm-1">
                        <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={user.profilePic} />
                    </div>
                    <div className="col-sm-11 main-textarea">
                        <div className="card-body mx-5 mt-1 pb-0 thread-body">
                            <h5 className="card-title pt-1">{user.name}<span className="text-muted thread-date"> · {dateFormatter(props.postDate)}</span></h5>
                            <div className="card-subtitle pt-1" dangerouslySetInnerHTML={{ __html: props.commentText }} />
                        </div>
                    </div>
                </div>
            }
            <hr />
        </>
    )
}
