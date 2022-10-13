const db = require("../database");



// Create a comment in the database.
exports.create = async (req, res) => {
  const comment = await db.comment.create({
    commentText: req.body.commentText,
    userID: req.body.currentUserID,
    threadID: req.body.threadID
  });

  res.json(comment);
};

// Select all comments from the database.
exports.all = async (req, res) => {
  const comments = await db.comment.findAll();

  res.json(comments);
};

// Select one comment from the database using ID.
exports.one = async (req, res) => {
  const comment = await db.comment.findByPk(req.params.id);

  res.json(comment);
};

// Select all comment from the database using threadID.
exports.allByThreadID = async (req, res) => {
  const allComments = await db.comment.findAll({ where: { threadID: req.query.threadID } });

  res.json(allComments);
};

// Delete all comments based off theadID
exports.deleteComments = async (req, res) => {
  await db.comment.destroy({ where: { threadID: req.params.id } });

  res.json("success");
};