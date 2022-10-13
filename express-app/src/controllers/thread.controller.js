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
  // req.body.threadID
  // req.body.post
  // req.body.postPic

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

  // thread = await db.thread.findByPk(req.body.threadID);
  // res.json(thread);



  // let user = await db.user.findByPk(req.body.userID);

  // if (req.body.profilePic === undefined) {
  //   let name = user.name;
  //   let email = user.email;
  //   let hash = user.passwordHash;

  //   // NAME
  //   if (name !== req.body.name)
  //     name = req.body.name;
  //   // EMAIL
  //   if (email !== req.body.email)
  //     email = req.body.email;
  //   // PASSWORD
  //   if (req.body.password.length !== 0) {
  //     if (await argon2.verify(hash, req.body.password) === false)
  //       hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
  //   }

  //   await db.user.update({
  //     name: name,
  //     email: email,
  //     passwordHash: hash
  //   }, {
  //     where: { userID: req.body.userID }
  //   });
  // }
  // else {
  //   let profilePic = user.profilePic;

  //   // PROFILE PICTURE
  //   if (req.body.profilePic !== "" && req.body.profilePic !== undefined && req.body.profilePic !== null)
  //     profilePic = req.body.profilePic;

  //   await db.user.update({
  //     profilePic: profilePic
  //   }, {
  //     where: { userID: req.body.userID }
  //   });
  // }

  // user = await db.user.findByPk(req.body.userID);
  // res.json(user);
};
