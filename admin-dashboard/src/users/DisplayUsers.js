import UserCard from "./UserCard"

export default function DisplayUsers() {

    return (
        <div class="card m-auto text-start px-3 py-2 m-0 mt-5 border-none" style={{width: "68%"}}>
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
            <UserCard />
        </div>
    )
}