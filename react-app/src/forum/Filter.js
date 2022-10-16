import React, { useState } from "react";

export default function Filter(props) {

    const handleFilterChange = () => {
        if (props.filter === "all")
            props.setFilter("followed")
        else if (props.filter === "followed")
            props.setFilter("all")
    }

    return (
        <>
            <div className="mt-3 mb-3">
                <div className="card mx-auto thread-card border-0" style={{ height: '80px' }}>
                    <div className="row align-items-center border-secondary m-0" style={{ height: '80px' }}>
                        <div className="">
                            <div className="row align-items-center text-center border-bottom border-secondary ">
                                <div className="col p-0">
                                    {
                                        props.filter === "all"
                                            ? <>
                                                <button className="btn w-100 fs-5 fw-bold" style={{ height: "80px" }}>All</button>
                                                <div className="border border-bottom border-primary w-100 bg-primary"></div>
                                            </>
                                            : <button className="btn w-100 fs-5" onClick={handleFilterChange} style={{ height: "80px" }}>All</button>
                                    }
                                </div>
                                <div className="col p-0">
                                    {
                                        props.filter === "followed"
                                            ? <>
                                                <button className="btn w-100 fs-5 fw-bold" style={{ height: "80px" }}>Following</button>
                                                <div className="border border-bottom border-primary w-100 bg-primary" />
                                            </>
                                            : <button className="btn w-100 fs-5" onClick={handleFilterChange} style={{ height: "80px" }}>Following</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}