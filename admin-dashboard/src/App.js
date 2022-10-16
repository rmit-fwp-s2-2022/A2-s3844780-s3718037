import React, { useEffect } from "react";
import { getUsers } from "./data/repository";


export default function App() {

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers()
			console.log(users)

		}
		fetchUsers()
	}, [])



	return (
		<div className="App">
			Admin Dashboard
		</div>
	);
}
