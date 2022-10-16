import React, { useEffect, useState } from "react";
import DisplayPosts from "./DisplayPosts"
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


    // const numbersOne = [1, 2, 3];
    // const numbersTwo = [4, 5, 6];
    // const numbersCombined = [...numbersOne, ...numbersTwo];

    // document.write(numbersCombined);


    return (
        <div>
            {
                isLoading ? <div></div> :
                    posts.map((post) =>
                        // If post is a thread
                        post.hasOwnProperty("threadID") ?
                            < DisplayPosts
                                key={post.updatedAt}
                                userID={post.userID}
                                threadID={post.threadID}
                                post={post.post}
                                postDate={post.updatedAt}
                                postPic={post.postPic}
                            />
                            :
                            // If post is a comment
                            <DisplayPosts
                                key={post.updatedAt}
                                commentID={post.commentID}
                                userID={post.userID}
                                threadID={post.threadID}
                                commentText={post.commentText}
                                postDate={post.updatedAt}
                            />
                    )
            }
        </div>
    )
}