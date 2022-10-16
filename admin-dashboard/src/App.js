import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { getUsers } from "./data/repository";

import Header from "./other/Header";
import PostSection from "./sections/PostSection";
import UserSection from "./sections/UserSection";
import UpperSection from "./sections/UpperSection";
import Users from "./users/Users"
import Posts from "./posts/Posts"

export default function App() {

	const navigate = useNavigate();

	const viewHome = () => navigate("/")
    const viewPosts = () => navigate("/posts")
    const viewUsers = () => navigate("/users")

	useEffect(() => {
		const fetchUsers = async () => {
			const users = await getUsers()
			console.log(users)
		}
		fetchUsers()
	}, [])

	return (
		<div className="App">
			<Header viewHome={viewHome} viewPosts={viewPosts} viewUsers={viewUsers} />
			<Routes>
				<Route path="/" element={
					<div className="container-fluid p-0">
						<UpperSection />
						<UserSection viewUsers={viewUsers}/>
						<PostSection viewPosts={viewPosts}/>
					</div>} />
				<Route path="/posts" element={
					<>
						<Posts />
					</>
				} />
				<Route path="/users" element={
					<>
						<Users />
					</>
				} />

			</Routes>
		</div>
	);
}
