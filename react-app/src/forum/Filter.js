import React, { useState } from "react";

export default function Filter(props) {

    // Filter to display followed user's posts
    const handleFilterChange = () => {
        if (props.filter === "all")
            props.setFilter("followed")
        else if (props.filter === "followed")
            props.setFilter("all")
    }
    
    return (
        <div className="mt-3 mb-3">
            <div className="card mx-auto thread-card border-0" style={{ height: '80px' }}>
                <div className="d-flex align-items-center px-5" style={{ height: '80px' }}>
                    {
                        props.filter === "all"
                        ? <button className="btn btn-primary me-5" style={{width: "13%"}}>All</button>
                        : <button className="btn btn-outline-secondary me-5" onClick={handleFilterChange} style={{ width: "13%" }}>All</button>  
                    }
                    {
                        props.filter === "followed"
                        ? <button className="btn btn-primary" style={{ width: "13%" }}>Followed</button>
                        : <button className="btn btn-outline-secondary" onClick={handleFilterChange} style={{ width: "13%" }}>Followed</button>
                    }
                </div>
            </div>
        </div>
    )
}