import React, { useState } from "react";
import { getThreads, newThread } from "../Util";

import NewPost from "../forum/NewPost.js";
import Thread from "../forum/Thread";
import AddImage from "../forum/AddImage";
import DeletePost from "../forum/DeletePost";


export default function Home(props) {

    // Obtain post image
    const [postURL, setPostURL] = useState("");
    // Obtain post message
    const [postMSG, setPostMSG] = useState(null);


    if (postMSG !== null) {
        // Create a new thread
        newThread(postMSG, postURL)
        // Reset post message state to null
        setPostMSG(null)
        // Reset post imageURL state to emplty
        setPostURL("")
    }

    // Obtain all threads
    let threads = getThreads()

    return (
        <>
            {/* Create new thread */}
            <NewPost passPostMSG={setPostMSG} />
            {/* Display threads */}
            {
                threads === null || threads === undefined || threads.length === 0 ?
                    <div className="mx-auto" style={{ width: '800px' }}>
                        <div className="mx-auto" style={{ width: '230px' }}>
                            <span className="text-muted mx-auto">No posts have been submitted.</span>
                        </div>
                    </div>
                    :
                    threads.map((thread) =>
                        <Thread
                            key={thread.tid}
                            userID={thread.userID}
                            tid={thread.tid}
                            post={thread.post}
                            postDate={thread.postDate}
                            postPic={thread.postPic}
                        />
                    )
            }
            {/* Upload Image */}
            <AddImage passPostURL={setPostURL} />

            <DeletePost passPostURL={setPostURL} />
            <div className="home-page-spacer"></div>
        </>
    )
}