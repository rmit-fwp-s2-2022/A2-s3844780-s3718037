import PostCard from "./PostCard"
import { inappropriateCheck } from "../Util";

export default function DisplayPosts(props) {
    return (
        <div className="container mt-4">
            <div className="row row-cols-4">
                {

                    // If post is a thread
                    props.hasOwnProperty("commentText") && inappropriateCheck(props.commentText) == false ?
                        // If post is a comment
                        <PostCard
                            key={props.updatedAt}
                            commentID={props.commentID}
                            userID={props.userID}
                            threadID={props.threadID}
                            commentText={props.commentText}
                            postDate={props.updatedAt}
                        />
                        : <div></div>}
                {
                    // If post is a thread
                    !props.hasOwnProperty("commentText") && inappropriateCheck(props.post) == false ?
                        < PostCard
                            key={props.updatedAt}
                            userID={props.userID}
                            threadID={props.threadID}
                            post={props.post}
                            postDate={props.updatedAt}
                            postPic={props.postPic}
                        />
                        : <div></div>}
            </div>
        </div>
    )
}