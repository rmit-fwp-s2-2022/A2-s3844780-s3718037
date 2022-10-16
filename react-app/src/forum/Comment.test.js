import { render, screen, fireEvent } from "@testing-library/react";
import Comment from "./Comment";
import preview from 'jest-preview';
import { createReaction, deleteThread, getThreads } from "../Util";
import { BrowserRouter } from 'react-router-dom';


let container;

const commentID = 1
const userID = 2
const threadID = 1
const commentText = "<p>Comment test!</p>"
const updatedAt = "2022-10-16 02:06:50"

// Runs once before tests, here global test data is initialised.
beforeAll(() => {

});

// Runs before each test, here the Users component is rendered and the container is stored.
beforeEach(() => {
    const utils = render(
        <BrowserRouter>
            <Comment
                key={commentID}
                commentID={commentID}
                userID={userID}
                threadID={threadID}
                commentText={commentText}
                postDate={updatedAt}
            />
        </BrowserRouter>);

    container = utils.container;
    jest.mock("axios");
});

it('Create a new reaction', async () => {
    await expect(createReaction("1", 2, 1, "commentID")).resolves.toBe(true);

    // preview.debug();
});
