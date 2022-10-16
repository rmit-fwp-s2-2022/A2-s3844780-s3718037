import { updateUser } from "../data/repository"
import React, { useState } from 'react'

export default function UserCard(props) {

    const [blockUser, setBlockUser] = useState(props.user.blocked)

    const handleBlockUser = async (event) => {
        props.user.blocked = parseInt(event.target.value);

        // Update user block status
        setBlockUser(props.user.blocked)
        await updateUser(props.user);
    };

    return (
        <div className="container m-0">
            <div className="row">
                <div className="col-sm-1">
                    <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={props.user.profilePic} alt="profile" />
                </div>
                <div className="col-sm-7">
                    <div className="card-body">
                        <h5 className="card-title m-y0">{props.user.name}</h5>
                        <p className="card-subtitle text-muted">{props.user.email}</p>
                    </div>
                </div>
                <div className="col">
                    <div className="card-body">
                        Follow Graph
                    </div>
                </div>
                <div className="col">
                    <div className="card-body">
                        No of profile visits
                    </div>
                </div>
                <div className="col">
                    <div className="card-body">
                        {
                            blockUser
                                ? <button className="btn btn-primary" value="0" onClick={handleBlockUser} >Unblock User</button>
                                : <button className="btn btn-danger" value="1" onClick={handleBlockUser} >Block User</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}