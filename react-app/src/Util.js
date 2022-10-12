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
    const response = await axios.delete(API_HOST + "/api/profiles/delete", { data: { userID: user.userID } });
    const success = response.data;

    //console.log(success);

    // Delete all threads and comments from user
    // deleteAllPostsById(user.userID)
}

async function updateUserProfile(userID, name, email, password) {
    await axios.put(API_HOST + "/api/profiles/update", { userID, name, email, password });
}

async function updateProfilePic(userID, profilePic) {
    await axios.put(API_HOST + "/api/profiles/update", { userID, profilePic });
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
    //const response = await axios.get(API_HOST + "/api/users/select/" + userID);
    const response = await axios.get(API_HOST + `/api/users/select/${userID}`);
    // const user = response.data;

    // console.log(response.data)

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
    // const threads = getThreads();
    // if (threads !== null) {
    //     return threads.find(thread => thread.tid === tid)
    // }

    const response = await axios.get(API_HOST + `/api/threads/select/${threadID}`);

    return response.data;


    // const response = await axios.get(API_HOST + "/api/threads/" + threadID);

}

// Return all comments.
async function getComments() {
    // return JSON.parse(localStorage.getItem(COMMENTS));

    const response = await axios.get(API_HOST + "/api/comments");
    return response.data;

}

// Return a whole array of comments related to the same thread.
async function getCommentsByID(threadID) {

    // const comments = getComments();
    // if (comments !== null) {
    //     return comments.filter(thread => thread.threadID === threadID);
    // }

    // SIMILAR TO FOLLOW CODE!

    const response = await axios.get(API_HOST + "/api/comments/all", { params: { threadID } });
    return response.data;

}




// Save new thread details to localstorage, return individual thread.
async function newThread(post, postPic) {

    // // Obtain all threads
    // let threads = getThreads()

    // // Assign a thread ID
    // let tid = null
    // if (threads !== null) {
    //     // Obtain a new unique thread ID (tid)
    //     tid = Math.max(...threads.map(thread => thread.tid)) + 1
    // } else {
    //     tid = 1
    // }

    // Obtain current user ID
    const currentUser = getUserInfo()
    const currentUserID = currentUser.userID
    // const postDate = dateFormatter()

    // Create individual thread
    //  const thread = { userID: currentUser.userID, tid: tid, post: post, postDate: postDate, postPic: postPic };

    // if (threads === null)
    //     threads = [];

    // // Add individual thread to theads array
    // threads.push(thread);
    // // Save threads to localstorage
    // localStorage.setItem(THREADS, JSON.stringify(threads));



    const response = await axios.post(API_HOST + "/api/threads", { post, postPic, currentUserID });
    const thread = response.data;

    return thread


}

// Add new comment to existing thread
async function newComment(threadID, commentText) {

    //console.log(threadID)
    //console.log(commentText)
    // Obtain all threads
    // let comments = getComments()

    // Assign a thread ID
    // let cid = null
    // if (comments !== null) {
    //     // Obtain a new unique comment ID (cid)
    //     cid = Math.max(...comments.map(comment => comment.cid)) + 1
    // } else {
    //     cid = 1
    // }

    // Obtain user details
    const currentUser = getUserInfo()
    const currentUserID = currentUser.userID
    //const postDate = dateFormatter()

    // Create individual comment
    // const comment = { userID: currentUser.userID, tid: tid, cid: cid, commentText: commentText, postDate: postDate };

    // if (comments === null)
    //     comments = [];

    // // Add individual thread to theads array
    // comments.push(comment);
    // // Save threads to localstorage
    // localStorage.setItem(COMMENTS, JSON.stringify(comments));

    const response = await axios.post(API_HOST + "/api/comments", { commentText, currentUserID, threadID });
    const comment = response.data;

    return comment
}

// Edit/Update post.
function updatePost(tid, post, postPic) {

    // Get thread info
    let threads = getThreads();

    for (let i = 0; i < threads.length; i++) {
        if (threads[i].tid === tid) {

            // Update details in list
            threads[i].post = post;
            threads[i].postPic = postPic;
            break;
        }
    }
    // Update threads
    localStorage.setItem(THREADS, JSON.stringify(threads));
    //console.log("Updated!")
}

// Delete a thread and all associated comments based on thread ID
function deleteThread(tid) {
    // Get threads
    let threads = getThreads();
    // Remove thread from list
    threads = threads.filter((value) => value.tid !== tid);
    // Update threads
    localStorage.setItem(THREADS, JSON.stringify(threads));

    //Get comments
    let comments = getComments();
    // Remove comments from list
    comments = comments.filter((value) => value.tid !== tid);
    // Update threads
    localStorage.setItem(COMMENTS, JSON.stringify(comments));
}

// Delete a thread and all associated comments from a user's ID
function deleteAllPostsById(userID) {
    // Get threads
    let threads = getThreads();
    // Remove thread from list
    threads = threads.filter((value) => value.userID !== userID);
    // Update threads
    localStorage.setItem(THREADS, JSON.stringify(threads));

    //Get comments
    let comments = getComments();
    // Remove comments from list
    comments = comments.filter((value) => value.userID !== userID);
    // Update threads
    localStorage.setItem(COMMENTS, JSON.stringify(comments));
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