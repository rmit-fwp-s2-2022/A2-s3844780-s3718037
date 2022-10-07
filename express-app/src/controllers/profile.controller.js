const argon2 = require("argon2");
const db = require("../database");
	

// Update user data
exports.update = async (req, res) => {
	let user = await db.user.findByPk(req.body.userID);

	if (req.body.profilePic === undefined)
	{
		let name = user.name;
		let email = user.email;
		let hash = user.passwordHash;

		// NAME
		if (name !== req.body.name)
		name = req.body.name;
		// EMAIL
		if (email !== req.body.email)
			email = req.body.email;
		// PASSWORD
		if (req.body.password.length !== 0)
		{
			if (await argon2.verify(hash, req.body.password) === false)
			hash = await argon2.hash(req.body.password, { type: argon2.argon2id });
		}

		await db.user.update({
			name: name,
			email: email,
			passwordHash: hash
		}, {
			where: { userID: req.body.userID }
		});
	}
	else
	{
		let profilePic = user.profilePic;

		// PROFILE PICTURE
		if (req.body.profilePic !== "" && req.body.profilePic !== undefined && req.body.profilePic !== null )
		profilePic = req.body.profilePic;

		await db.user.update({
			profilePic: profilePic
		}, {
			where: { userID: req.body.userID }
		});
	}

	user = await db.user.findByPk(req.body.userID);
	res.json(user);
};

// Delete user record
exports.delete = async (req, res) => {
	await db.user.destroy({ where: { userID: req.body.userID } });

	res.json("success");
};