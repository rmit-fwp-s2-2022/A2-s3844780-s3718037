import React, { useState } from "react";
import DisplayUsers from "./DisplayUsers"

export default function Users() {

    const [filter, setFilter] = useState("all");

    const handleFilterChange = (event) => setFilter(event.target.value);

    return (
        <div>
            <div className="container mt-5">
                <div className="card mx-auto profile-card border-0">
                    <div className="row align-items-center border-bottom border-secondary m-0">
                        <div className="">
                            <div className="row align-items-center text-center">
                                <div className="col p-0">
                                    {
                                        filter === "all"
                                            ? <>
                                                <button className="btn w-100 fs-5 fw-bold" style={{ height: "80px" }}>All</button>
                                                <div className="border border-bottom border-primary w-100" />
                                            </>
                                            : <button className="btn w-100 fs-5" onClick={handleFilterChange} value="all" style={{ height: "80px" }}>All</button>
                                    }
                                </div>
                                <div className="col p-0">
                                    {
                                        filter === "blocked"
                                            ? <>
                                                <button className="btn w-100 fs-5 fw-bold" style={{ height: "80px" }}>Blocked</button>
                                                <div className="border border-bottom border-primary w-100" />
                                            </>
                                            : <button className="btn w-100 fs-5" onClick={handleFilterChange} value="blocked" style={{ height: "80px" }}>Blocked</button>
                                    }
                                </div>
                                <div className="col p-0">
                                    {
                                        filter === "unblocked"
                                            ? <>
                                                <button className="btn w-100 fs-5 fw-bold" style={{ height: "80px" }}>Unblocked</button>
                                                <div className="border border-bottom border-primary w-100" />
                                            </>
                                            : <button className="btn w-100 fs-5" onClick={handleFilterChange} value="unblocked" style={{ height: "80px" }}>Unblocked</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DisplayUsers filter={filter} />
        </div>
    )
}