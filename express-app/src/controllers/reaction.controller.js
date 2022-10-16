const db = require("../database");

// Get a single reaction from the database where userID and threadID.
exports.getThreadReactions = async (req, res) => {
  const reaction = (await db.reaction.findAll({ where: { userID: req.query.userID, threadID: req.query.ID } }))[0];
  res.json(reaction);
};

// Get a single reaction from the database where userID and commentID.
exports.getCommentReactions = async (req, res) => {
  const reaction = (await db.reaction.findAll({ where: { userID: req.query.userID, commentID: req.query.ID } }))[0];
  res.json(reaction);
};

// Create a thread reaction in the database.
exports.createTReaction = async (req, res) => {
  const reaction = await db.reaction.create({
    reactionType: req.body.reaction,
    userID: req.body.userID,
    threadID: req.body.ID
  });
  res.json(reaction);
};

// Create a comment reaction in the database.
exports.createCReaction = async (req, res) => {
  const reaction = await db.reaction.create({
    reactionType: req.body.reaction,
    userID: req.body.userID,
    commentID: req.body.ID
  });
  res.json(reaction);
};

// Update reaction
exports.update = async (req, res) => {
  await db.reaction.update({
    reactionType: req.body.reaction
  }, {
    where: { reactionID: req.body.reactionID }
  });
  res.json("success");
};

// Get all reactions where threadID.
exports.allTReactions = async (req, res) => {
  const reactions = await db.reaction.findAll({ where: { threadID: req.query.ID } });
  res.json(reactions);
};

// Get all reactions where commentID.
exports.allCReactions = async (req, res) => {
  const reactions = await db.reaction.findAll({ where: { commentID: req.query.ID } });
  res.json(reactions);
};
