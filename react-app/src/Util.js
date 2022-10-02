const USERS = "users"
const USER_DATA = 'user_data';
const THREADS = "threads"
const COMMENTS = "comments"

// eslint-disable-next-line no-useless-escape
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})/;
const NAME_REGEX = /[^a-zA-Z ]+/;

function isEmailRegistered(email) {
    const users = getUsers();

    // At least one user registered
    if (users !== null)
        // Check if the email is registered
        for (const user of users)
            if (user.email === email)
                return true;

    return false;
}

// Send new users details to localstorage
function registerUser(name, email, password) {
    // Get stored users
    let users = getUsers();

    // Obtain current date
    const joinDate = dateFormatter();
    // Set default profile picture
    const profilePic = 'https://i.imgur.com/7A1AbrN.png'

    // Assign a user ID
    let uid = null
    if (users !== null) {
        // Obtain a new unique user ID (uid)
        uid = Math.max(...users.map(user => user.uid)) + 1
    } else {
        uid = 1
    }

    const user = { uid: uid, name: name, email: email, password: password, joinDate: joinDate, profilePic: profilePic }; // TODO - Encrypt the password

    if (users === null)
        users = [];

    users.push(user);
    localStorage.setItem(USERS, JSON.stringify(users));

    return user;
}

// Remove users and delete their threads/comments
function deleteUser(user) {

    // Get users
    let users = getUsers();
    // Remove user from list
    users = users.filter((value) => value.email !== user.email);
    // Update users
    localStorage.setItem(USERS, JSON.stringify(users));

    // Delete all threads and comments from user
    deleteAllPostsById(user.uid)
}

function updateUserProfile(name, email, password) {

    // Get user info
    let users = getUsers();
    let userInfo = getUserInfo();

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === userInfo.email) {
            // Update details in list
            users[i].name = name;
            users[i].email = email;

            // Update for login info
            userInfo.name = name;
            userInfo.email = email;

            if (password.length > 0) {
                users[i].password = password;
                userInfo.password = password;
            }
            break;
        }
    }

    // Update user
    localStorage.setItem(USER_DATA, JSON.stringify(userInfo));
    localStorage.setItem(USERS, JSON.stringify(users));
}

function updateProfilePic(imageURL) {
    // Get user info
    let users = getUsers();
    let userInfo = getUserInfo();

    for (let i = 0; i < users.length; i++) {
        if (users[i].email === userInfo.email) {
            // Update details in list
            users[i].profilePic = imageURL;

            // Update for login info
            userInfo.profilePic = imageURL;
            break;
        }
    }

    // Update user
    localStorage.setItem(USER_DATA, JSON.stringify(userInfo));
    localStorage.setItem(USERS, JSON.stringify(users));
}

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

// Email validation
function validEmail(email) {
    return EMAIL_REGEX.test(email);
}

// Login authentication
function verifyUser(email, password) {
    const users = getUsers();

    if (users !== null)
        for (const user of users)
            if (user.email === email && user.password === password)
                return user;

    return null;
}

function getUserInfo() {
    return JSON.parse(localStorage.getItem(USER_DATA));
}

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS));
}

function getUserByID(uid) {
    const users = getUsers();
    if (users !== null) {
        return users.find(user => user.uid === uid)
    }
}

function getThreads() {
    return JSON.parse(localStorage.getItem(THREADS));
}

// Return the thread from its ID.
function getThreadsByID(tid) {
    const threads = getThreads();
    if (threads !== null) {
        return threads.find(thread => thread.tid === tid)
    }
}

// Return all comments.
function getComments() {
    return JSON.parse(localStorage.getItem(COMMENTS));
}

// Return a whole array of comments related to the same thread.
function getCommentsByID(tid) {
    const comments = getComments();
    if (comments !== null) {
        return comments.filter(thread => thread.tid === tid);
    }
}

// Return a whole array of threads related to the same user.
function getAllThreadsByID(uid) {
    const threads = getThreads();
    if (threads !== null) {
        return threads.filter(thread => thread.tid === uid);
    }
}

// Save new thread details to localstorage, return individual thread.
function newThread(post, postPic) {

    // Obtain all threads
    let threads = getThreads()

    // Assign a thread ID
    let tid = null
    if (threads !== null) {
        // Obtain a new unique thread ID (tid)
        tid = Math.max(...threads.map(thread => thread.tid)) + 1
    } else {
        tid = 1
    }

    // Obtain user details
    const currentUser = getUserInfo()
    const postDate = dateFormatter()

    // Create individual thread
    const thread = { uid: currentUser.uid, tid: tid, post: post, postDate: postDate, postPic: postPic };

    if (threads === null)
        threads = [];

    // Add individual thread to theads array
    threads.push(thread);
    // Save threads to localstorage
    localStorage.setItem(THREADS, JSON.stringify(threads));

    return thread
}

// Add new comment to existing thread
function newComment(tid, commentText) {

    // Obtain all threads
    let comments = getComments()

    // Assign a thread ID
    let cid = null
    if (comments !== null) {
        // Obtain a new unique comment ID (cid)
        cid = Math.max(...comments.map(comment => comment.cid)) + 1
    } else {
        cid = 1
    }

    // Obtain user details
    const currentUser = getUserInfo()
    const postDate = dateFormatter()

    // Create individual comment
    const comment = { uid: currentUser.uid, tid: tid, cid: cid, commentText: commentText, postDate: postDate };

    if (comments === null)
        comments = [];

    // Add individual thread to theads array
    comments.push(comment);
    // Save threads to localstorage
    localStorage.setItem(COMMENTS, JSON.stringify(comments));

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
    console.log("Updated!")
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
function deleteAllPostsById(uid) {
    // Get threads
    let threads = getThreads();
    // Remove thread from list
    threads = threads.filter((value) => value.uid !== uid);
    // Update threads
    localStorage.setItem(THREADS, JSON.stringify(threads));

    //Get comments
    let comments = getComments();
    // Remove comments from list
    comments = comments.filter((value) => value.uid !== uid);
    // Update threads
    localStorage.setItem(COMMENTS, JSON.stringify(comments));
}


export {
    isEmailRegistered,
    registerUser,
    deleteUser,
    updateUserProfile,
    updateProfilePic,
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