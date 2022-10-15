import { deleteThread } from "../Util";

export default function EditPost(props) {

    const removeThread = (event) => {
        // Prevent page from refreshing/reloading
        event.preventDefault();

        // Close the modal
        const closeBTN = "delete-profile-btn-close" + props.threadID
        document.getElementById(closeBTN).click();

        // Pass inputs to parent component
        props.passShowThread(false)

        // Delete thread
        deleteThread(props.threadID);
    }

    return (
        <div className="modal fade" id={"delete-post-modal" + props.threadID} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="delete-post-modal-label">Delete Post</h5>
                        <button type="button" id={"delete-post-btn-close" + props.threadID} className="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this thread?</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">NO</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={removeThread} >YES</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
