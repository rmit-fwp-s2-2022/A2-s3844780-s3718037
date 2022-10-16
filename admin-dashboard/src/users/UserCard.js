export default function UserCard() {

    return (
        <div className="container m-0">
            <div className="row">
                <div className="col-sm-1">
                    <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={"user.profilePic"} alt="profile" />
                </div>
                <div className="col-sm-7">
                    <div className="card-body">
                        <h5 className="card-title m-y0">{"user.name"}</h5>
                        <p className="card-subtitle text-muted">{"user.email"}</p>
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
                        <button className="btn btn-danger">Block User</button>
                    </div>
                </div>
            </div>
        </div>
    )
}