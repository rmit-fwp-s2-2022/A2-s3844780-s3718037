
export default function PostCard() {



    return (
        <div className="col my-4">
            <div className="card m-auto text-start" style={{ width: "20rem", minHeight: "300px" }}>
                <div className="card-body">
                    <h5 className="card-title">User Name</h5>
                    <p className="card-text">A post message </p>
                    <img src="https://i.imgur.com/MHKPi6F.jpeg" className="card-img-top" alt="..." />
                    <div className="mt-3">
                        <button className="btn btn-primary mx-4">Block User</button>
                        <button className="btn btn-danger">Remove Post</button>
                    </div>
                </div>
            </div>
        </div>
    )
}