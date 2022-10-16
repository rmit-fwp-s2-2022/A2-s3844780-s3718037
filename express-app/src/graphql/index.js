const { buildSchema } = require("graphql");
const db = require("../database");

const graphql = {};

// GraphQL.
// Construct a schema, using GraphQL schema language
graphql.schema = buildSchema(`
  # The GraphQL types are declared first.

  # NOTE: The owner and pet are pseudo-joined; whilst they are related, how they are related is an implementation detail
  # that is NOT exposed in the GraphQL schema. This can be seen with the Pet type which has no field linking it to
  # an owner. That said an owner has many pets and this is exposed within the GraphQL schema by association.
  # Behind the scenes the database pet table has an additional field called email which is a FK to owner.
  
  type User {
    userID: Int,
    name: String,
    email: String,
    passwordHash: String,
    profilePic: String,
    createdAt: String,
    updatedAt: String
  }
  
  type Thread {
    threadID: Int,
    post: String,
    postPic: String,
    createdAt: String,
    updatedAt: String,
    userID: Int
  }

  type Comment {
    commentID: Int,
    commentText: String,
    createdAt: String,
    updatedAt: String,
    userID: Int,
    threadID: Int
  }

  type Reaction {
    reactionID: Int,
    reactionType: Int,
    userID: Int,
    threadID: Int,
    commentID: Int
  }

  type FollowUser {
    followID: Int,
    userID: Int,
    userFollowedID: Int
  }

  # Queries (read-only operations).
  type Query {
      all_users: [User]
  }

`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.
  all_users: async () => {
    return await db.user.findAll();
  }
};

module.exports = graphql;


