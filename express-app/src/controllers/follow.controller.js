const argon2 = require("argon2");
const db = require("../database");
	
// Is user following the user?
exports.isFollow = async (req, res) => {
	const followRecord = (await db.followUser.findAll({ where: { userID: req.query.userID, userFollowedID: req.query.userFollowedID} }))[0];
	
	res.json(followRecord);
};

// Get all users, user is following
exports.allFollows = async (req, res) => {
	const followRecords = await db.followUser.findAll({ where: { userID: req.query.userID } });
	
	res.json(followRecords);
};

// Follow a user
exports.follow = async (req, res) => {
	const followRecord = await db.followUser.create({
		userID: req.body.userID,
		userFollowedID: req.body.userFollowedID
	});
	
	res.json(followRecord);
};

// Unfollow the user
exports.unfollow = async (req, res) => {
	await db.followUser.destroy({ where: { userID: req.body.userID, userFollowedID: req.body.userFollowedID } });

	res.json("success");
};