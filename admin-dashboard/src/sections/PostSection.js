import DisplayPosts from "../posts/DisplayPosts"


export default function PostSection(props) {

    return (
        <div className='row text-center w-100' style={{ backgroundColor: "" }}>
            <div className='col'>
                <div className="row">
                    <div className='col'>
                        <DisplayPosts />
                    </div>
                </div>
                <div className="row">
                    <div className='col'>
                        <button className="btn btn-primary btn-lg my-3" onClick={props.viewPosts}>View Posts</button>
                    </div>
                </div>
            </div>
        </div>
    )
}