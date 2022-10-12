const db = require("../database");

// Create a thread in the database.
exports.create = async (req, res) => {
  const thread = await db.thread.create({
    post: req.body.post,
    postPic: req.body.postPic,
    userID: req.body.currentUserID
  });

  res.json(thread);
};

// Select all threads from the database.
exports.all = async (req, res) => {
  const threads = await db.thread.findAll();

  res.json(threads);
};

// Select one thread from the database using ID.
exports.one = async (req, res) => {
  const thread = await db.thread.findByPk(req.params.id);

  res.json(thread);
};



