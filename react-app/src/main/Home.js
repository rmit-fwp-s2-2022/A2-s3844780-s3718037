import React, { useEffect, useState } from "react";
import { getThreads, newThread, getUserFollows } from "../Util";

import NewPost from "../forum/NewPost.js";
import Thread from "../forum/Thread";
import AddImage from "../forum/AddImage";
import DeletePost from "../forum/DeletePost";
import Filter from "../forum/Filter.js";


export default function Home(props) {

    // Obtain post image
    const [postURL, setPostURL] = useState("");
    // Obtain post message
    const [postMSG, setPostMSG] = useState(null);
    // Get and set all threads
    const [threads, setThreads] = useState("");
    // Filter Threads
    const [filter, setFilter] = useState("all");
    // List of all user follows
    const [userFollows, setUserFollows] = useState(null);
    // Allow Threads to be returned before displaying them
    const [isLoading, setIsLoading] = useState(true);
    // Allow threads to re-render upon new thread
    const [change, setChange] = useState(false);

    // User follow logic
    useEffect(() => {
        const getFollows = async () => {
            const followRecords = await getUserFollows(props.user.userID);
            const userFollowIDs = followRecords.map((followRecord) => { return followRecord.userFollowedID })
            setUserFollows(userFollowIDs);
        }
        getFollows();
    }, [])

    // Create a new thread and then cause a re-render
    useEffect(() => {
        const createNewThread = async () => {
            // Create a new thread
            await newThread(postMSG, postURL)
            // Reset post message state to null
            setPostMSG(null)
            // Reset post imageURL state to emplty
            setPostURL("")
            // Update state to cause threads to be re-rendered
            setChange(true)
        }
        if (postMSG !== null) {
            createNewThread();
        }
    }, [postMSG, postURL])

    // Obtain all threads.
    useEffect(() => {
        async function loadThreads() {
            const allThreads = await getThreads();

            setThreads(allThreads);
            setIsLoading(false);
        }
        loadThreads();
        // Reset change useState
        setChange(false)
    }, [change]);


    return (
        <>
            {/* Create new thread */}
            <NewPost passPostMSG={setPostMSG} profilePic={props.user.profilePic} />
            {/* Filter */}
            <Filter filter={filter} setFilter={setFilter} />
            {/* Display threads */}
            {
                threads === null || threads === undefined || threads.length === 0 ?
                    <div className="mx-auto" style={{ width: '800px' }}>
                        <div className="mx-auto" style={{ width: '230px' }}>
                            <span className="text-muted mx-auto">No posts have been submitted.</span>
                        </div>
                    </div>
                    :
                    isLoading ? <div></div> :
                        threads.map((thread) => {
                            if (filter === "followed") {
                                if (!userFollows.includes(thread.userID))
                                    return;
                            }

                            return <Thread
                                key={thread.threadID}
                                userID={thread.userID}
                                threadID={thread.threadID}
                                post={thread.post}
                                postDate={thread.updatedAt}
                                postPic={thread.postPic}
                            />
                        })

            }
            {/* Upload Image */}
            <AddImage passPostURL={setPostURL} />

            <DeletePost passPostURL={setPostURL} />
            <div className="home-page-spacer"></div>
        </>
    )
}