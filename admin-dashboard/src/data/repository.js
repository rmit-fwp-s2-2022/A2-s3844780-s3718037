import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// --- Owner ---------------------------------------------------------------------------------------

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


export {
  getUsers
}
