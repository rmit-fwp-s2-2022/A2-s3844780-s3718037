import { render, screen, fireEvent } from "@testing-library/react";
import Home from "./Home";
import preview from 'jest-preview';

// import { newThread } from "./Util.js";

// newThread("test")

// Global data for tests.
let user = {
    userID: 21, name: "Bob", email: "bob@bob.com", passwordHash: "$password",
    profilePic: "https://i.imgur.com/7A1AbrN.png", updatedAt: "2022-10-15T13:18:24.727Z",
    createdAt: "2022-10-15T13:18:24.727Z"
};

let container;

// Runs once before tests, here global test data is initialised.
beforeAll(() => {
    // users = getUsers();
});

// Runs before each test, here the Users component is rendered and the container is stored.
beforeEach(() => {
    const utils = render(<Home user={user} />);

    container = utils.container;
});

test("Render users", () => {
    expect(container).toBeInTheDocument();

    preview.debug();
});


