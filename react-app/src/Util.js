import axios from "axios";

// --- Constants -------------------------------------------------------------------------
const API_HOST = "http://localhost:4001";
const USERS = "users"
const USER_DATA = 'user_data';
const THREADS = "threads"
const COMMENTS = "comments"

// --- Regex -----------------------------------------------------------------------------
// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
const NAME_REGEX = /[^a-zA-Z ]+/;

// --- User ------------------------------------------------------------------------------
async function isEmailRegistered(email) {
    const response = await axios.get(API_HOST + "/api/users/select", { params: { email } });
    let user = response.data;

    // Email already registered
    if (user !== "" && user !== undefined && user !== null)
        return true;

    return false;
}

// Create a new user in the database
async function registerUser(name, email, password) {
    const response = await axios.post(API_HOST + "/api/users", { name, email, password });
    const user = response.data;

    return user;
}

// Login authentication
async function verifyUser(email, password) {
    const response = await axios.get(API_HOST + "/api/users/login", { params: { email, password } });
    const user = response.data;
    //console.log(user);

    if (user !== null)
        return user;

    return null;
}

// Remove users and delete their threads/comments
async function deleteUser(user) {

    // Delete all threads and comments from user
    await deleteAllPostsById(user.userID)

    const response = await axios.delete(API_HOST + "/api/profiles/delete", { data: { userID: user.userID } });
    const success = response.data;

}

async function updateUserProfile(userID, name, email, password) {
    const response = await axios.put(API_HOST + "/api/profiles/update", { userID, name, email, password });
    const user = response.data;

    // Update user
    localStorage.setItem(USER_DATA, JSON.stringify(user));
}

async function updateProfilePic(userID, profilePic) {
    const response = await axios.put(API_HOST + "/api/profiles/update", { userID, profilePic });
    const user = response.data;

    // Update user
    localStorage.setItem(USER_DATA, JSON.stringify(user));
}

// --- Follow Functionality ---------------------------------------------------------------------------------------
async function followUser(userID, userFollowedID, isFollowing) {
    if (isFollowing) {
        // Follow User
        await axios.post(API_HOST + "/api/follows", { userID, userFollowedID });
        return true;
    }
    else {
        // Unfollow User
        await axios.delete(API_HOST + "/api/follows", { data: { userID, userFollowedID } });

        return false;
    }
}

async function isUserFollowed(userID, userFollowedID) {
    const response = await axios.get(API_HOST + "/api/follows", { params: { userID, userFollowedID } });
    const user = response.data;

    if (user !== undefined && user !== null && user !== "")
        return true;

    return false;
}

async function getUserFollows(userID) {
    const response = await axios.get(API_HOST + "/api/follows/all", { params: { userID } });
    const followRecords = response.data;

    return followRecords;
}

// --- Helper Functions ---------------------------------------------------------------------------------------
// Return a pre-formatted date when a user registers their account
function dateFormatter() {
    const date = new Date();

    // Obtain date in segments
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Format date
    const formattedDate = month + " " + day + ", " + year;
    return formattedDate
}

// Password validation
function validPassword(password) {
    // At least 8 characters long (?=.{8,}).
    // At least one uppercase letter (?=.*[A-Z]).
    // At least one lowercase letter (?=.*[a-z]).
    // At least one digit (?=.*[0-9]).
    // At least one special character ([^A-Za-z0-9]).
    return PASSWORD_REGEX.test(password);
}

// Local email validation
function validEmail(email) {
    return EMAIL_REGEX.test(email);
}

// Return logged in user via local storage
function getUserInfo() {
    return JSON.parse(localStorage.getItem(USER_DATA));
}

// Return all users
async function getUsers() {
    const response = await axios.get(API_HOST + "/api/users/");
    const users = response.data;
    return users;
}

// Return a single user by ID
async function getUserByID(userID) {
    const response = await axios.get(API_HOST + `/api/users/select/${userID}`);
    return response.data;
}


// --- Threads & Comments ---------------------------------------------------------------------------------------
// Return all threads
async function getThreads() {
    const response = await axios.get(API_HOST + "/api/threads");
    return response.data;
}

// Return a thread from its ID.
async function getThreadsByID(threadID) {
    const response = await axios.get(API_HOST + `/api/threads/select/${threadID}`);
    return response.data;
}

// Return all comments.
async function getComments() {
    const response = await axios.get(API_HOST + "/api/comments");
    return response.data;
}

// Return a whole array of comments related to the same thread.
async function getCommentsByID(threadID) {
    const response = await axios.get(API_HOST + "/api/comments/all", { params: { threadID } });
    return response.data;
}

// Save new thread details to localstorage, return individual thread.
async function newThread(post, postPic) {

    // Obtain current user ID
    const currentUser = getUserInfo()
    const currentUserID = currentUser.userID

    const response = await axios.post(API_HOST + "/api/threads", { post, postPic, currentUserID });
    const thread = response.data;

    return thread
}

// Add new comment to existing thread
async function newComment(threadID, commentText) {

    // Obtain user details
    const currentUser = getUserInfo()
    const currentUserID = currentUser.userID

    const response = await axios.post(API_HOST + "/api/comments", { commentText, currentUserID, threadID });
    const comment = response.data;
    return comment
}

// Edit/Update post.
async function updatePost(threadID, post, postPic) {
    await axios.put(API_HOST + "/api/threads/update", { threadID, post, postPic });
}

// Delete a thread and all associated comments based on thread ID
async function deleteThread(threadID) {

    // Delete comments associated with the thread.
    await axios.delete(API_HOST + `/api/comments/delete/${threadID}`);
    // Delete the thread itself.
    await axios.delete(API_HOST + `/api/threads/delete/${threadID}`);
}

// Delete a thread and all associated comments from a user's ID
async function deleteAllPostsById(userID) {

    // Delete comments associated with the thread.
    await axios.delete(API_HOST + `/api/comments/deleteFromUserID/${userID}`);
    // Delete the thread itself.
    await axios.delete(API_HOST + `/api/threads/deleteFromUserID/${userID}`);
}


export {
    isEmailRegistered,
    registerUser,
    deleteUser,
    updateUserProfile,
    updateProfilePic,
    followUser, isUserFollowed, getUserFollows,
    validPassword,
    validEmail,
    verifyUser,
    getUserInfo,
    getUsers,
    newThread,
    getThreads,
    getUserByID,
    newComment,
    getCommentsByID,
    getThreadsByID,
    updatePost,
    deleteThread,
    deleteAllPostsById,
    USER_DATA,
    NAME_REGEX
}