import PostCard from "./PostCard"

export default function DisplayPosts(props) {
    return (
        <div className="container mt-4">
            <div className="row row-cols-4">
                {

                    // If post is a thread
                    props.hasOwnProperty("commentText") ?
                        // If post is a comment
                        <PostCard
                            key={props.updatedAt}
                            commentID={props.commentID}
                            userID={props.userID}
                            threadID={props.threadID}
                            commentText={props.commentText}
                            postDate={props.updatedAt}
                        />
                        :
                        < PostCard
                            key={props.updatedAt}
                            userID={props.userID}
                            threadID={props.threadID}
                            post={props.post}
                            postDate={props.updatedAt}
                            postPic={props.postPic}
                        />
                }
            </div>
        </div>
    )
}