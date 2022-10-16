import React, { useState, useEffect } from "react";
import { getUserByID, dateFormatter, storeReaction, getReactionCount } from "../Util";
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

export default function Comment(props) {

    // Get and set individual user related to comment
    const [user, setUser] = useState(null)
    // Allow user data to be returned before displaying them
    const [isLoading, setIsLoading] = useState(true);
    // User reactions state
    const [reaction, setReaction] = useState(null);
    // Reaction score
    const [reactionScore, setReactionScore] = useState(null);

    // Obtain user by ID
    useEffect(() => {
        const fetchUser = async () => {
            const user = await getUserByID(props.userID)
            setUser(user)
            setIsLoading(false);
        }
        fetchUser()
    }, [])

    // Create/update reaction and set reaction scores.
    useEffect(() => {
        async function createReaction() {
            // Create a new reaction and update scores
            if (reaction !== null) {
                // Store/update reaction in database
                await storeReaction(reaction, props.user.userID, props.commentID, "commentID")
                const score = await getReactionCount(props.commentID, "commentID");
                setReactionScore(score)
            }
            // Update scores upon render
            if (reaction === null) {
                const score = await getReactionCount(props.commentID, "commentID");
                setReactionScore(score)
            }
        }
        createReaction();
    }, [reaction]);

    // Handle upvoting a post event
    const upvotePost = (event) => {
        event.preventDefault();
        setReaction(1)
    }

    // Handle upvoting a post event
    const downvotePost = (event) => {
        event.preventDefault();
        setReaction(0)
    }


    return (
        <>
            {/* Comment example - TODO Refactor into own component */}
            {isLoading ? <div></div> :
                <div className="row">
                    <div className="col-sm-1">
                        <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={user.profilePic} />
                    </div>
                    <div className="col-sm-9 main-textarea">
                        <div className="card-body mx-5 mt-1 pb-0 thread-body">
                            <h5 className="card-title pt-1">{user.name}
                                <span className="text-muted thread-bar"> · {dateFormatter(props.postDate)}</span>
                                <span className="text-muted thread-bar"> · {reactionScore === null ? 0 + " Score" : reactionScore + " Score"}  </span>
                            </h5>
                            <div className="card-subtitle pt-1" dangerouslySetInnerHTML={{ __html: props.commentText }} />
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <>
                            <a href="#" className="btn mt-3 reaction-icons" onClick={upvotePost}><ArrowUpward className="up-icon" style={{ fontSize: 30, color: '#6C757D' }} /></a>
                            <a href="#" className="btn mt-3 reaction-icons" onClick={downvotePost}><ArrowDownward className="down-icon" style={{ fontSize: 30, color: '#6C757D' }} /></a>

                        </>
                    </div>
                </div>
            }
            <hr />
        </>
    )
}
