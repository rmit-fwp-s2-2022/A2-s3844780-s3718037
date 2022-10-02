import React from 'react';
import { Link } from 'react-router-dom'

export default function Header(props) {
    return (
        <nav className="navbar navbar-expand-lg bg-white sticky-top">
            <Link to="/">
                <img className="logo-img" src="https://i.imgur.com/DAwxGzb.png" alt="Loop Agile Now logo" />
            </Link>
            <Link className="logo-text navbar-brand ps-3" to="/">Loop Agile Now</Link>
            <div className="container justify-content-end">

                {/* Registration */}
                {props.user === null &&
                    <>
                        <button className="btn btn-sm btn-success me-2" data-bs-toggle="modal" data-bs-target="#signup-modal">Sign Up</button>
                        <button className="btn btn-sm btn-secondary" data-bs-toggle="modal" data-bs-target="#login-modal">Login</button>
                    </>
                }

                {/* Account & Log Out */}
                {props.user !== null &&
                    <>
                        <span className="nav-link me-2">Welcome, {props.user.name}</span>
                        <Link className="nav-link" to="/profile">
                            <button className="btn btn-sm btn-success me-2" >Profile</button>
                        </Link>
                        <button className="btn btn-sm btn-secondary" onClick={props.userLogout} >Log Out</button>
                    </>
                }
            </div>
        </nav>
    );
}