import React, { useEffect, useState } from "react";
import { followUser, isUserFollowed } from "../Util";

export default function DisplayUser(props) {

    const [userFollowed, setUserFollowed] = useState(false);

    useEffect(() => {
        const getUserFollowed = async () => {
            setUserFollowed(await isUserFollowed(props.user.userID, props.followUserID));
        }
        getUserFollowed();
    }, [])

    const handleUserFollow = async () => {
        setUserFollowed(await followUser(props.user.userID, props.followUserID, !userFollowed));
    }

    return (
        <div className="row align-items-center">
            <div className="col-sm-1">
                <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={props.profilePic} alt="profile" />
            </div>
            <div className="col-sm-7">
                <div className="card-body mx-5 mt-1">
                    <h5 className="card-title m-y0">{props.name}</h5>
                    <p className="card-subtitle text-muted">{props.email}</p>
                </div>
            </div>
            {
                !props.isDifferentUser &&
                <div className="col text-center">
                    {
                        userFollowed
                            ? <button type="button" className="btn btn-danger" onClick={handleUserFollow} >Unfollow</button>
                            : <button type="button" className="btn btn-primary" onClick={handleUserFollow} >Follow</button>
                    }
                </div>
            }
        </div>
    )
}