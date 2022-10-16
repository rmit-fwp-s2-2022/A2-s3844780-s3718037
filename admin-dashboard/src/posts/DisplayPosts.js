import PostCard from "./PostCard"

export default function DisplayPosts() {
    return (
        <div className="container mt-4">
            <div className="row row-cols-4">
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
                <PostCard />
            </div>
        </div>
    )
}