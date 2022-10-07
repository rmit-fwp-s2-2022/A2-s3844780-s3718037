const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
	Op: Sequelize.Op
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.DIALECT
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.thread = require("./models/thread.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);
db.followUser = require("./models/followUser.js")(db.sequelize, DataTypes);
db.reaction = require("./models/reaction.js")(db.sequelize, DataTypes);

// Associations (creating foreign keys)
	// User
db.thread.belongsTo(db.user, { foreignKey: { name: "userID", allowNull: false } });
db.comment.belongsTo(db.user, { foreignKey: { name: "userID", allowNull: false } });
db.followUser.belongsTo(db.user, { foreignKey: { name: "userID", allowNull: false } });
db.followUser.belongsTo(db.user, { foreignKey: { name: "userFollowedID", allowNull: false } });
db.reaction.belongsTo(db.user, { foreignKey: { name: "userID", allowNull: false } });
	// Other
db.comment.belongsTo(db.thread, { foreignKey: { name: "threadID", allowNull: false } });
db.reaction.belongsTo(db.thread, { foreignKey: { name: "threadID" } });
db.reaction.belongsTo(db.comment, { foreignKey: { name: "commentID" } });

// Learn more about associations here: https://sequelize.org/master/manual/assocs.html

// Include a sync option with seed data logic included.
db.sync = async () => {
	// Sync schema.
	await db.sequelize.sync();

	// Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
	// await db.sequelize.sync({ force: true });

	await seedData();
};

async function seedData() {
	const count = await db.user.count();

	// Only seed data if necessary.
	if (count > 0)
		return;

	// Password hashing
	const argon2 = require("argon2");

	// let hash = await argon2.hash("test1234!", { type: argon2.argon2id });
	// await db.user.create({ name: "test", email: "quabblequack@gmail.com", passwordHash: hash, profilePic: "https://i.imgur.com/7A1AbrN.png" });
}

module.exports = db;
