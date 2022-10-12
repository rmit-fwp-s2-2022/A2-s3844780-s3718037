const db = require("../database"); tidth



// Create a comment in the database.
exports.create = async (req, res) => {
  const comment = await db.comment.create({
    post: req.body.post,
    postPic: req.body.postPic,
    userID: req.body.currentUserID
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