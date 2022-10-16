import UserCard from "./UserCard"
import React, { useContext } from 'react'
import { UsersContext } from '../App'

export default function DisplayUsers(props) {

    const users = useContext(UsersContext)
    let filterUsers = [];

    if (users !== undefined && users !== null)
        // Filter
        if (props.filter === undefined)
            filterUsers = users.slice(0, 4);
        else if (props.filter === "all")
            filterUsers = users;
        else if (props.filter === "blocked")
            filterUsers = users.filter((user) => {
                if (user.blocked)
                    return user;
            })
        else if (props.filter === "unblocked")
            filterUsers = users.filter((user) => {
                if (!user.blocked)
                    return user;
            })

    return (<>
        {
            filterUsers.length > 0 ?
                <div className="card m-auto text-start px-3 py-2 m-0 mt-5 border-none" style={{ width: "68%" }}>
                    {
                        filterUsers.map((user) => {
                            return <UserCard
                                key={user.userID}
                                user={user}
                            />
                        })
                    }
                </div>
                :
                <p className="text-center mt-4">No Users Found</p>
        }
    </>
    )
}