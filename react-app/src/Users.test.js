import { render, screen, fireEvent } from "@testing-library/react";
import SignUp from "./registration/SignUp.js";
import Login from "./registration/Login.js";
import EditProfile from "./profile/EditProfile.js";
import {
	registerUser,
	validEmail, validPassword,
	verifyUser, deleteUser,
	updateUserProfile, updateProfilePic
} from "./Util.js"

// Global data for tests.
let loginUser;
let updateUser;
let delUser;
let password;

// Runs once before tests
beforeAll(async () => {
	password = "password1!";
	loginUser = await registerUser("Login User", "loginu@rmit.edu.au", password);
	updateUser = await registerUser("Update User", "updateu@rmit.edu.au", password);
	delUser = await registerUser("Delete User", "deleteu@rmit.edu.au", password);
});

// Runs before each test
beforeEach(() => {

});

/* 
 * - Validates the inputs to ensure it matches the requirements
 * - Uses values from inputs to register user to ensure inputs are working correctly
 * - Ensures registering user via API works
*/
test("Sign Up Verification", async () => {
	const utils = render(<SignUp />);
	const container = utils.container;
	expect(container).toBeInTheDocument();

	const nameInput = screen.getByLabelText("Name");
	const emailInput = screen.getByLabelText("Email address");
	const passwordInput = screen.getByLabelText("New Password");
	const samePasswordInput = screen.getByLabelText("Re-enter Password");

	// Simulate input
	fireEvent.change(nameInput, { target: { value: "Register User" } });
	fireEvent.change(emailInput, { target: { value: "registeru@rmit.edu.au" } });
	fireEvent.change(passwordInput, { target: { value: password } });
	fireEvent.change(samePasswordInput, { target: { value: password } });

	// Validate inputs
	expect(/[a-zA-Z ]+/.test(nameInput.value)).toBe(true);
	expect(validEmail(emailInput.value.toLowerCase())).toBe(true);
	expect(validPassword(passwordInput.value)).toBe(true);
	expect(passwordInput.value).toBe(samePasswordInput.value);	

	// Register user to database
	const user = await registerUser(nameInput.value, emailInput.value.toLowerCase(), passwordInput.value);

	expect(user !== null && user != undefined).toBe(true);
});

/* 
 * - Validates the inputs to ensure it matches the requirements
 * - Uses values from inputs to register user to ensure inputs are working correctly
 * - Ensures logging user in via API works
*/
test("Login Verification", async () => {
	const utils = render(<Login />);
	const container = utils.container;
	expect(container).toBeInTheDocument();

	const emailInput = screen.getByLabelText("Email address");
	const passwordInput = screen.getByLabelText("Password");

	// Simulate input
	fireEvent.change(emailInput, { target: { value: loginUser.email } });
	fireEvent.change(passwordInput, { target: { value: password } });

	// Verify login
	const result = await verifyUser(emailInput.value, passwordInput.value);

	expect((result !== null && result !== undefined)).toBe(true);
});

/* 
 * - Simulates a user entering a url into the input
 * - Tests updating the profile picture via the API
*/
test("Update Profile Picture", async () => {
	const utils = render(<EditProfile user={updateUser} />);
	const container = utils.container;
	expect(container).toBeInTheDocument();

	// Simulate Input
	const urlInput = screen.getByRole("textbox", { name: "url-input-field" });
	fireEvent.change(urlInput, { target: { value: "https://randomuser.me/api/portraits/men/32.jpg" } });
	
	// Update Profile Picture from input
	const result = await updateProfilePic(updateUser.userID, urlInput.value);

	expect(result).toBe(200);
});

/* 
 * - Validates the inputs to ensure it matches the requirements
 * - Uses values from inputs to register user to ensure inputs are working correctly
 * - Ensures updating the user's information via API works
*/
test("Change Profile Information", async () => {
	console.log(updateUser);
	const utils = render(<EditProfile user={updateUser} />);
	const container = utils.container;
	expect(container).toBeInTheDocument();

	const nameInput = screen.getByLabelText("Name");
	const emailInput = screen.getByLabelText("Email address");
	const passwordInput = screen.getByLabelText("Change Password");
	const samePasswordInput = screen.getByLabelText("Re-enter Password");

	// Simulate input
	fireEvent.change(nameInput, { target: { value: "Kanel Donald" } });
	fireEvent.change(emailInput, { target: { value: "kaneld@rmit.edu.au" } });
	fireEvent.change(passwordInput, { target: { value: "different1!"} });
	fireEvent.change(samePasswordInput, { target: { value: "different1!" } });
	
	// Validate inputs
	expect(validEmail(emailInput.value.toLowerCase())).toBe(true);
	expect(validPassword(passwordInput.value)).toBe(true);
	expect(passwordInput.value).toBe(samePasswordInput.value);
	expect(/[a-zA-Z ]+/.test(nameInput.value)).toBe(true);

	const result = await updateUserProfile(updateUser.userID, nameInput.value, emailInput.value, passwordInput.value);

 	expect(result).toBe(200);
});

/* 
 * - Test deleting user via the API
*/
test("Delete User", async () => {
	// Delete User Test
	const result = await deleteUser(delUser.userID);

	expect(result).toBe(200);
});
