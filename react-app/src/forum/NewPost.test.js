import { render, screen, fireEvent } from "@testing-library/react";
import NewPost from "./NewPost";
import preview from 'jest-preview';
import { newThread, deleteThread, getThreads } from "../Util";
import { BrowserRouter } from 'react-router-dom';


let container;

const setPostMSG = null
const profilePic = "https://i.imgur.com/7A1AbrN.png"

// Runs once before tests, here global test data is initialised.
beforeAll(() => {

});

// Runs before each test, here the Users component is rendered and the container is stored.
beforeEach(() => {
    const utils = render(<BrowserRouter><NewPost passPostMSG={setPostMSG} profilePic={profilePic} /></BrowserRouter>);
    container = utils.container;
    jest.mock("axios");
});

it('Create a new thread', async () => {
    await expect(newThread("testing", "https://i.imgur.com/HVShIYV.jpg", 1)).resolves.toBe(true);

    // preview.debug();
});

it('Delete a thread', async () => {
    const threads = getThreads()
    await expect(deleteThread(threads[0])).resolves.toBe(true);

    // preview.debug();
});