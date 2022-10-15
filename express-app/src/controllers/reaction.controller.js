const db = require("../database");

// // Create a thread in the database.
// exports.create = async (req, res) => {
//   const thread = await db.thread.create({
//     post: req.body.post,
//     postPic: req.body.postPic,
//     userID: req.body.currentUserID
//   });

//   res.json(thread);
// };




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
  const reactions = await db.reaction.findAll({ where: { threadID: req.query.ID } });
  res.json(reactions);
};


// // Select one thread from the database using ID.
// exports.one = async (req, res) => {
//   const thread = await db.thread.findByPk(req.params.id);

//   res.json(thread);
// };

// // Delete a thread based off theadID
// exports.deleteThread = async (req, res) => {
//   await db.thread.destroy({ where: { threadID: req.params.id } });

//   res.json("success");
// };

// // Delete a thread based off userID
// exports.deleteThreadUserID = async (req, res) => {
//   await db.thread.destroy({ where: { userID: req.params.id } });

//   res.json("success");
// };

// // Update thread
// exports.update = async (req, res) => {
//   if (req.body.postPic === undefined) {

//     await db.thread.update({
//       post: req.body.post
//     }, {
//       where: { threadID: req.body.threadID }
//     });

//   } else {
//     await db.thread.update({
//       post: req.body.post,
//       postPic: req.body.postPic
//     }, {
//       where: { threadID: req.body.threadID }
//     });
//   }

//   res.json("success");
// };
