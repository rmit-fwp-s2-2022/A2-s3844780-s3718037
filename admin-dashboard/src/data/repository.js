import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// --- User ---------------------------------------------------------
// Return all users
async function getUsers() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_users {
        userID,
        name,
        email,
        passwordHash,
        profilePic,
        createdAt,
        updatedAt,
        blocked
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.all_users;
}

// Return a single user based off userID
async function getUser(userID) {
  // Query with parameters (variables).
  const query = gql`
    query ($userID: Int) {
      user(userID: $userID) {
        userID,
        name,
        email,
        passwordHash,
        profilePic,
        createdAt,
        updatedAt,
        blocked
      }
    }
  `;

  const variables = { userID };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.user;
}

async function updateUser(user) {
  const query = gql`
    mutation ($userID: Int, $name: String, $email: String, $passwordHash: String,
      $profilePic: String, $createdAt: String, $updatedAt: String, $blocked: Int) {
      update_user(input: {
        userID: $userID,
        name: $name,
        email: $email,
        passwordHash: $passwordHash,
        profilePic: $profilePic,
        createdAt: $createdAt,
        updatedAt: $updatedAt
        blocked: $blocked
      }) {
        userID,
        name,
        email,
        passwordHash,
        profilePic,
        createdAt,
        updatedAt,
        blocked
      }
    }
  `;

  const variables = user;
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.update_user;
}

// --- Threads ---------------------------------------------------------
// Return all threads
async function getThreads() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_threads {
        threadID,
        post,
        postPic,
        createdAt,
        updatedAt,
        userID
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.all_threads;
}

// Return a single thread based off threadID
async function getThread(threadID) {
  // Query with parameters (variables).
  const query = gql`
    query ($threadID: Int) {
      thread(threadID: $threadID) {
        threadID,
        post,
        postPic,
        createdAt,
        updatedAt,
        userID
      }
    }
  `;

  const variables = { threadID };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.thread;
}

async function updateThread(thread) {
  const query = gql`
    mutation ($threadID: Int, $post: String, $postPic: String,
      $createdAt: String, $updatedAt: String, $userID: Int) {
        update_thread(input: {
        threadID: $threadID,
        post: $post,
        postPic: $postPic,
        createdAt: $createdAt,
        updatedAt: $updatedAt
        userID: $userID
        
      }) {
        threadID,
        post,
        postPic,
        createdAt,
        updatedAt,
        userID
      }
    }
  `;

  const variables = thread;
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.update_thread;
}

// --- Comments ---------------------------------------------------------

// Return all comments
async function getComments() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_comments {
        commentID,
        commentText,
        createdAt,
        updatedAt,
        userID,
        threadID
      }
    }
  `;

  const data = await request(GRAPH_QL_URL, query);
  return data.all_threads;
}

// Return a single comment based off commentID
async function getComment(commentID) {
  // Query with parameters (variables).
  const query = gql`
    query ($commentID: Int) {
      comment(commentID: $commentID) {
        commentID,
        commentText,
        createdAt,
        updatedAt,
        userID,
        threadID
      }
    }
  `;

  const variables = { commentID };
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.comment;
}

async function updateComment(comment) {
  const query = gql`
    mutation ($commentID: Int, $commentText: String, $createdAt: String,
      $updatedAt: String, $userID: Int, $threadID: Int) {
        update_thread(input: {
        commentID: $commentID,
        commentText: $commentText,
        createdAt: $createdAt,
        updatedAt: $updatedAt,
        userID: $userID,
        threadID: $threadID
      }) {
        commentID,
        commentText,
        createdAt,
        updatedAt,
        userID,
        threadID
      }
    }
  `;

  const variables = comment;
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.update_comment;
}

export {
  getUsers, getUser, updateUser,
  getThreads, getThread, updateThread,
  getComments, getComment, updateComment
}

