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
  
  # User table
  type User {
    userID: Int,
    name: String,
    email: String,
    passwordHash: String,
    profilePic: String,
    createdAt: String,
    updatedAt: String
  }

  # Thread table
  type Thread {
    threadID: Int,
    post: String,
    postPic: String,
    createdAt: String,
    updatedAt: String,
    userID: Int
  }

  # Comment table
  type Comment {
    commentID: Int,
    commentText: String,
    createdAt: String,
    updatedAt: String,
    userID: Int,
    threadID: Int
  }

  # Reaction table
  type Reaction {
    reactionID: Int,
    reactionType: Int,
    userID: Int,
    threadID: Int,
    commentID: Int
  }

  # FollowUser table
  type FollowUser {
    followID: Int,
    userID: Int,
    userFollowedID: Int
  }

  # ThreadInput used for incoming data.
  input ThreadInput {
    threadID: Int,
    post: String,
    postPic: String,
    createdAt: String,
    updatedAt: String,
    userID: Int
  }

  # UserInput used for incoming data.
  input UserInput {
    userID: Int,
    name: String,
    email: String,
    passwordHash: String,
    profilePic: String,
    createdAt: String,
    updatedAt: String
  }

  # CommentInput used for incoming data.
  input CommentInput {
    commentID: Int,
    commentText: String,
    createdAt: String,
    updatedAt: String,
    userID: Int,
    threadID: Int
  }

  # Queries (read-only operations).
  type Query {
      all_users: [User]
  }

  # Mutations (modify data in the underlying data-source, i.e., the database).
  type Mutation {
    update_user(input: UserInput): User
    update_thread(input: ThreadInput): Thread
    update_comment(input: CommentInput): Comment
  }

`);

// The root provides a resolver function for each API endpoint.
graphql.root = {
  // Queries.

  // Return all users
  all_users: async () => {
    return await db.user.findAll();
  },

  // Return a single user based off userID
  user: async (args) => {
    return await db.user.findByPk(args.userID);
  },

  // Update user
  update_user: async (args) => {
    const user = await db.user.findByPk(args.input.userID);

    // Update fields.
    user.userID = args.input.userID;
    user.name = args.input.name;
    user.email = args.input.email;
    user.passwordHash = args.input.passwordHash;
    user.profilePic = args.input.profilePic;
    user.createdAt = args.input.createdAt;
    user.updatedAt = args.input.updatedAt;

    await user.save();
    return user;
  },

  // Return all threads
  all_threads: async () => {
    return await db.thread.findAll();
  },

  // Return a single thread based off threadID
  thread: async (args) => {
    return await db.thread.findByPk(args.threadID);
  },

  // Update thread
  update_thread: async (args) => {
    const thread = await db.thread.findByPk(args.input.threadID);

    // Update fields.
    thread.threadID = args.input.threadID;
    thread.post = args.input.post;
    thread.postPic = args.input.postPic;
    thread.createdAt = args.input.createdAt;
    thread.updatedAt = args.input.updatedAt;
    thread.userID = args.input.userID;

    await thread.save();
    return thread;
  },

  // Update comment
  update_comment: async (args) => {
    const comment = await db.comment.findByPk(args.input.commentID);

    // Update fields.
    comment.commentID = args.input.commentID;
    comment.commentText = args.input.commentText;
    comment.createdAt = args.input.createdAt;
    comment.updatedAt = args.input.updatedAt;
    comment.threadID = args.input.threadID;

    await comment.save();
    return comment;
  }

};


module.exports = graphql;