import React from 'react';
import { Link } from 'react-router-dom'

export default function Header(props) {


    return (
        <nav className="navbar navbar-expand-lg bg-white sticky-top p-0" style={{ height: "70px"}}>
            <Link to="/">
                <img className="logo-img" src="https://i.imgur.com/DAwxGzb.png" alt="Loop Agile Now logo" />
            </Link>
            <Link className="logo-text navbar-brand ps-3" to="/">LAN - Dashboard</Link>
            <div className="container justify-content-center p-0 h-100">
                <button className="btn w-25 h-100 p-0 fs-5" onClick={props.viewHome}>Home</button>
                <div className='border-end border-dark h-100'></div>
                <button className="btn w-25 h-100 p-0 fs-5" onClick={props.viewPosts}>Posts</button>
                <div className='border-end border-dark h-100'></div>
                <button className="btn w-25 h-100 p-0 fs-5" onClick={props.viewUsers}>Users</button>
            </div>
        </nav>
    )
}