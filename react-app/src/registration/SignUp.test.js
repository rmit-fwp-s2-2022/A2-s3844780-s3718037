import { render, screen, fireEvent } from "@testing-library/react";
import preview from 'jest-preview';
import SignUp from "../registration/SignUp.js";

// See here for more information:
// https://reactjs.org/docs/testing.html
// https://github.com/testing-library/react-testing-library
// https://testing-library.com/docs/
// https://testing-library.com/docs/react-testing-library/intro

// Global data for tests.
let container;

// Runs once before tests
beforeAll(() => {

});

// Runs before each test
beforeEach(() => {
	// const utils = render(<BrowserRouter> <App/> </BrowserRouter>);
	const utils = render(<SignUp />);
	container = utils.container;
});

test("Sign Up User", async () => {
	expect(container).toBeInTheDocument();

	const signUpButton = screen.getByRole('button', { name: /submit/i });

	console.log(signUpButton.outerHTML);

	// Launch Modal
	fireEvent.click(signUpButton);

	// Check if modal is in document
	// expect(container).toBeInTheDocument();

	const nameInput = screen.getByLabelText("Name");
	const emailInput = screen.getByLabelText("Email address");
	const passwordInput = screen.getByLabelText("New Password");
	const samePasswordInput = screen.getByLabelText("Re-enter Password");

	// Simulate input
	fireEvent.change(nameInput, { target: { value: "John Highland" } });
	fireEvent.change(emailInput, { target: { value: "johnh@rmit.edu.au" } });
	fireEvent.change(passwordInput, { target: { value: "password1!" } });
	fireEvent.change(samePasswordInput, { target: { value: "password1!" } });

	// Get submit button
	const submitButton = screen.getByRole('button', { name: /submit/i });

	// Submit registration form
	fireEvent.click(submitButton);

	// See if logged in
	// const welcomeText = screen.getByText(/sign /i);
	// const welcomeText = screen.getByText(/welcome, /i);

	preview.debug();

	// expect(welcomeText.textContent).toBe("Sign Up");
});


