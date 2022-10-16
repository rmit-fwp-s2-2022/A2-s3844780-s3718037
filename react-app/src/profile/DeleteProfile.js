import { deleteUser } from "../Util";

export default function DeleteProfile(props) {

    const deleteProfile = () => {
        // Delete user and logout
        deleteUser(props.user.userID);
        props.userLogout();
    }

    return (
        <div className="modal fade" id="delete-profile-modal" tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="delete-profile-modal-label">Delete Profile</h5>
                        <button type="button" id="delete-profile-btn-close" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete your account?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">NO</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={deleteProfile}>YES</button>
                    </div>
                </div>
            </div>
        </div>
    )
}