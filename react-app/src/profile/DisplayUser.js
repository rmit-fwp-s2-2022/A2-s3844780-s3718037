import React, { useEffect, useState } from "react";

export default function DisplayUser(props) {

    return (
        <div className="row align-items-center">
            <div className="col-sm-1">
                <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={ props.user.profilePic } alt="profile" />
            </div>
            <div className="col-sm-7">
                <div className="card-body mx-5 mt-1">
                    <h5 className="card-title m-y0">{ props.user.name }</h5>
                    <p className="card-subtitle text-muted">{ props.user.email }</p>
                </div>
            </div>
        </div>
    )
}