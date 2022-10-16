import React, { useEffect, useState } from "react";
import DisplayUser from "../profile/DisplayUser.js";
import { getUserByID, getUserFollows, getAllUsers } from "../Util.js";


export default function DisplayFollows(props) {

    const [tabFollows, setTabFollows] = useState(true);
    const [displayUsers, setDisplayUsers] = useState(null);

    useEffect(() => {
        // Get a list of users the user is following
        const getFollows = async () => {
            const followRecords = await getUserFollows(props.user.userID);
            const userFollowings = await Promise.all(followRecords.map(async (followRecord) => {
                return await getUserByID(followRecord.userFollowedID);
            })) 
            setDisplayUsers(userFollowings);
        }

        // Get a list of users for the user to follow
        const getUsersToFollow = async () => {
            const followRecords = await getUserFollows(props.user.userID);
            const userFollowIDs = followRecords.map((followRecord) => { return followRecord.userFollowedID })

            const userRecords = await getAllUsers();
            const usersToFollow = userRecords.filter((userRecord) => {
                if (!userFollowIDs.includes(userRecord.userID) && props.user.userID !== userRecord.userID)
                    return userRecord;
            })

            setDisplayUsers(usersToFollow);
        }

        // Filter
        if (tabFollows)
            getFollows();
        else
            getUsersToFollow();
    }, [tabFollows])
    
    const handleChangeTab = () => {
        setTabFollows(!tabFollows);
    }
    
    return (
        <div className="container mt-3">
            <div className="card mx-auto profile-card border-0">
                <div className="row align-items-center border-bottom border-secondary m-0">
                    <div className="">
                        <div className="row align-items-center text-center">
                            <div className="col p-0">
                                {
                                    // Display list of users the user is following
                                    tabFollows === true
                                        ? <>
                                            <button className="btn w-100 fs-5 fw-bold" style={{ height: "80px" }}>Following</button>
                                            <div className="border border-bottom border-primary w-100" />
                                        </>
                                        : <button className="btn w-100 fs-5" onClick={handleChangeTab} style={{height: "80px"}}>Following</button>
                                }
                            </div>
                            {
                                // Do not display this tab, if looking at another user's profile
                                props.isDifferentUser === false &&
                                <div className="col p-0">
                                    {
                                        // Display list of users for the user to follow
                                        tabFollows === false
                                            ? <>
                                                <button className="btn w-100 fs-5 fw-bold" style={{ height: "80px" }}>Who to follow</button>
                                                <div className="border border-bottom border-primary w-100" />
                                            </>
                                            : <button className="btn w-100 fs-5" onClick={handleChangeTab} style={{height: "80px"}}>Who to follow</button>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mx-auto profile-card border-0">
                {
                    // To display all user with follow button
                    displayUsers !== null  &&
                    displayUsers.map((user) => {
                        return <DisplayUser
                            key={user.userID}
                            user={props.user}
                            isDifferentUser={props.isDifferentUser}
                            followUserID={user.userID}
                            profilePic={user.profilePic}
                            name={user.name}
                            email={user.email}
                        />
                    })
                }
            </div>
        </div>
    )
}