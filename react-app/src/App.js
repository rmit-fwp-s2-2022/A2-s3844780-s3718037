import 'bootstrap/dist/css/bootstrap.css';
// eslint-disable-next-line
import { Modal } from 'bootstrap';
import React, { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import LandingPage from "./main/LandingPage";
import Home from "./main/Home";
import Header from "./other/Header";
import Footer from "./other/Footer";
import Login from "./registration/Login";
import MultiFactorAuthentication from './registration/MultiFactorAuthentication';
import SignUp from "./registration/SignUp";
import ViewProfile from "./profile/ViewProfile.js";
import DisplayFollows from "./profile/DisplayFollows.js";
import EditProfile from './profile/EditProfile';
import DeleteProfile from './profile/DeleteProfile';
import AddImage from './forum/AddImage';
import { getUserInfo, USER_DATA } from "./Util.js";

export default function App() {
	const navigate = useNavigate();

	// Set the website's name next to favicon
	document.title = "Loop Agile Now"

	// Store user data (if logged in)
	const [user, setUser] = useState(getUserInfo());

	// Info to send email code
	const [userLoginData, setUserLoginData] = useState(null);

	// Log user in
	const userLogin = (user) => {
		localStorage.setItem(USER_DATA, JSON.stringify(user));
		setUser(user);
		navigate("/profile");
	}

	// Log user out
	const userLogout = () => {
		localStorage.removeItem(USER_DATA);
		setUser(null);
		navigate("/");
	}

	// Update the useState after editing profile
	const updateUser = () => {
		setUser(getUserInfo());
	}

	return (
		<>
			<Header user={user} userLogout={userLogout} />
			<Routes>
				<Route path="/" element={
					<>
						{/* User not logged in */}
						{user === null && <LandingPage />}

						{/* User logged in */}
						{user !== null && <Home user={user} />}
						<Footer />
					</>} />
				<Route path="/profile" element={
					<>
						<ViewProfile user={user} />
						<DisplayFollows /> 
					</> } />
			</Routes>
			<Login setUserLoginData={setUserLoginData} />
			<MultiFactorAuthentication user={user} userLogin={userLogin} userLoginData={userLoginData} />
			<SignUp userLogin={userLogin} />

			{user !== null &&
				<>
					<EditProfile updateUser={updateUser} user={user} />
					<DeleteProfile userLogout={userLogout} user={user} />
					<AddImage user={user} />
				</>
			}
		</>
	);
}