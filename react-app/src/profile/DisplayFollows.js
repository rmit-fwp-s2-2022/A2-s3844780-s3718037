import React, { useEffect, useState } from "react";
import DisplayUser from "../profile/DisplayUser.js";
import { getUserInfo } from "../Util.js";


export default function DisplayFollows(props) {

    const user = getUserInfo();

    return (
        <div className="container mt-3">
            <div className="card mx-auto profile-card border-0">
                <div className="row align-items-center border-bottom border-secondary m-0">
                    <div className="card-body mx-5 mt-1 ">
                        <div className="row align-items-center text-center">
                            <div className="col mx-5 ">
                                <p className="m-1">Following</p>
                            </div>
                            <div className="col mx-5">
                                <p className="m-1">Who to follow</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card mx-auto profile-card border-0">
                <DisplayUser user={ user } />
                <DisplayUser user={ user } />
                <DisplayUser user={ user } />
                <DisplayUser user={ user } />
                <DisplayUser user={ user } />
            </div>
        </div>
    )
}