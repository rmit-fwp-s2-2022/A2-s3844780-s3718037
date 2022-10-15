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

// Delete a thread based off theadID
exports.deleteThread = async (req, res) => {
  await db.thread.destroy({ where: { threadID: req.params.id } });

  res.json("success");
};

// Delete a thread based off userID
exports.deleteThreadUserID = async (req, res) => {
  await db.thread.destroy({ where: { userID: req.params.id } });

  res.json("success");
};

// Update thread
exports.update = async (req, res) => {
  if (req.body.postPic === undefined) {

    await db.thread.update({
      post: req.body.post
    }, {
      where: { threadID: req.body.threadID }
    });

  } else {
    await db.thread.update({
      post: req.body.post,
      postPic: req.body.postPic
    }, {
      where: { threadID: req.body.threadID }
    });
  }
  res.json("success");
};
