import React, { useEffect, useState } from "react";
import { followUser, isUserFollowed, dateFormatter } from "../Util";
import { useLocation } from "react-router-dom";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
export default function Profile(props) {

    const [userFollowed, setUserFollowed] = useState(false);

    const location = useLocation();

    let user = props.user;
    let isDifferentUser = false;
    if (location.state !== null) {
        if (location.state.user.userID !== props.user.userID) {
            isDifferentUser = true
            user = location.state.user;
        }
    }

    useEffect(() => {
        const getUserFollowed = async () => {
            setUserFollowed(await isUserFollowed(props.user.userID, user.userID));
        }
        if (isDifferentUser)
            getUserFollowed();
    }, [])

    const handleUserFollow = async () => {
        setUserFollowed(await followUser(props.user.userID, user.userID, !userFollowed));
    }

    return (
        <div className="container mt-3">
            <div className="card mx-auto profile-card border-0">
                <div className="row align-items-center">
                    <div className="col-sm-1">
                        <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={user.profilePic} alt="profile" />
                    </div>
                    <div className="col-sm-7">
                        <div className="card-body mx-5 mt-1">
                            <h5 className="card-title m-y0">{user.name}</h5>
                            <p className="card-subtitle text-muted">{user.email}</p>
                        </div>
                    </div>
                    {
                        isDifferentUser ?
                            <>
                                <div className="col text-center">
                                    {
                                        userFollowed
                                            ? <button type="button" className="btn btn-danger" onClick={handleUserFollow} >Unfollow</button>
                                            : <button type="button" className="btn btn-primary" onClick={handleUserFollow} >Follow</button>
                                    }
                                </div>

                            </>
                            :
                            <>
                                <div className="col-sm-2">
                                    <div className="card-body">
                                        <a href="#" className="btn mt-3 edit-icon" data-bs-toggle="modal" data-bs-target="#edit-profile-modal"><EditIcon style={{ fontSize: 35 }} /></a>
                                    </div>
                                </div>
                                <div className="col-sm-2">
                                    <div className="card-body profile-card-body">
                                        <a href="#" className="btn mt-3 delete-icon" data-bs-toggle="modal" data-bs-target="#delete-profile-modal"><DeleteIcon style={{ color: 'red', fontSize: 35 }} /></a>
                                    </div>
                                </div>
                            </>
                    }

                </div>
                <div className="card-footer profile-card border-top-0 pt-0">
                    <small className="text-muted ">Joined: {dateFormatter(user.createdAt)}</small>
                </div>
            </div>
        </div>
    )
}