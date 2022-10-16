import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// --- Owner ---------------------------------------------------------------------------------------

// Return all users
async function getUsers() {
  // Simply query with no parameters.
  const query = gql`
    {
      all_users {
        userID,
        email,
        passwordHash,
        profilePic,
        createdAt,
        updatedAt
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
        email,
        passwordHash,
        profilePic,
        createdAt,
        updatedAt
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
      $profilePic: String, $createdAt: String, $updatedAt: String) {
      update_user(input: {
        userID: $userID,
        name: $name,
        email: $email,
        passwordHash: passwordHash,
        profilePic: profilePic,
        createdAt: createdAt,
        updatedAt: updatedAt
      }) {
        userID,
        name,
        email,
        passwordHash,
        profilePic,
        createdAt,
        updatedAt
      }
    }
  `;

  const variables = user;
  const data = await request(GRAPH_QL_URL, query, variables);
  return data.update_user;
}

async function updateThread(thread) {
  const query = gql`
    mutation ($threadID: Int, $post: String, $postPic: String,
      $createdAt: String, $updatedAt: String, $userID: Int) {
        update_thread(input: {
        threadID: $threadID,
        post: $post,
        postPic: $postPic,
        createdAt: createdAt,
        updatedAt: updatedAt
        userID: userID,
        
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




export {
  getUsers, getUser, updateUser, updateThread
}
