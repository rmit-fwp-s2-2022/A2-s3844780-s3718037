import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

export default function Profile(props) {
    return (
        <div className="container mt-3">
            <div className="card mx-auto profile-card border-0">
                <div className="row">
                    <div className="col-sm-1">
                        <img className="card-img rounded-circle profile-pic mx-4 my-3 border" src={props.user.profilePic} alt="profile" />
                    </div>
                    <div className="col-sm-7">
                        <div className="card-body mx-5 mt-1">
                            <h5 className="card-title">{props.user.name}</h5>
                            <p className="card-subtitle text-muted">{props.user.email}</p>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="card-body">
                            <a href="#" className="btn mt-3 edit-icon" data-bs-toggle="modal" data-bs-target="#edit-profile-modal"><EditIcon style={{ fontSize: 35 }} /></a>
                        </div>
                    </div>
                    <div className="col-sm-2">
                        <div className="card-body profile-card-body">
                            <a href="#" className="btn mt-3 delete-icon" data-bs-toggle="modal" data-bs-target="#delete-profile-modal"><DeleteIcon style={{ color: 'red', fontSize: 35 }} /></a>
                        </div>
                    </div>

                </div>
                <div className="card-footer profile-card border-top-0 pt-0">
                    <small className="text-muted ">Joined: {props.user.joinDate}</small>
                </div>
            </div>
        </div>
    )
}