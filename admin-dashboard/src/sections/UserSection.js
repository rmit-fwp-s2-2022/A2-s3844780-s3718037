import DisplayUsers from "../users/DisplayUsers"

export default function UserSection(props) {

    return (
        <div className='row text-center w-100' style={{ backgroundColor: "" }} >
            <div className='col'>
                <div className="row">
                    <div className='col'>
                        <DisplayUsers />
                    </div>
                </div>
                <div className="row">
                    <div className='col'>
                        <button className="btn btn-primary btn-lg my-5" onClick={props.viewUsers}>View Users</button>
                    </div>
                </div>
            </div>
        </div>
    )
}