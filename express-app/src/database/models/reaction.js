module.exports = (sequelize, DataTypes) =>
	sequelize.define("reaction", {
		reactionID: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		// userID: {
		// 	type: DataTypes.INTEGER,
		// 	foreignKey: true,
		// 	allowNull: false
		// },
		// commentID: {
		// 	type: DataTypes.INTEGER,
		// 	foreignKey: true,
		// },
		// threadID: {
		// 	type: DataTypes.INTEGER,
		// 	foreignKey: true,
		// },
		reactionType: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	}, {
		// Don't add the timestamp attributes (updatedAt, createdAt).
		timestamps: false
	});
