import { getUserByID } from "../Util";

export default function Comment(props) {

    // Obtain user by ID
    const user = getUserByID(props.uid)

    return (
        <>
            {/* Comment example - TODO Refactor into own component */}
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
            <hr />
        </>
    )
}
