import React, { useEffect, useState } from "react";
import PostCard from "./PostCard"
import { getThreads, getComments } from "../data/repository";


export default function Posts() {

    // Get and set all posts
    const [posts, setPosts] = useState("");
    // Allow threads to re-render upon new thread
    const [change, setChange] = useState(false);
    // Allow posts to be returned before displaying them
    const [isLoading, setIsLoading] = useState(true);

    // Obtain all threads and comments.
    useEffect(() => {
        async function loadPosts() {
            const allThreads = await getThreads();
            const allComments = await getComments();
            // Combine thrads and comments into a single array and update state
            const allPosts = [...allThreads, ...allComments]
            setPosts(allPosts);
            setIsLoading(false);
        }
        loadPosts();
        // Reset change useState
        setChange(false)
    }, [change]);


    return (
        <div>
            <div className="container mt-4">
                <div className="row row-cols-4">

                    {
                        isLoading ? <div></div> :
                            posts.map((post) =>
                                // If post is a thread
                                post.hasOwnProperty("commentText") ?
                                    // If post is a comment
                                    <PostCard
                                        key={post.updatedAt}
                                        commentID={post.commentID}
                                        userID={post.userID}
                                        threadID={post.threadID}
                                        commentText={post.commentText}
                                        postDate={post.updatedAt}
                                    />
                                    :
                                    < PostCard
                                        key={post.updatedAt}
                                        userID={post.userID}
                                        threadID={post.threadID}
                                        post={post.post}
                                        postDate={post.updatedAt}
                                        postPic={post.postPic}
                                    />
                            )
                    }
                </div>
            </div>
        </div>
    )
}