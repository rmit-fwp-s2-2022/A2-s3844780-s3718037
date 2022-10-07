module.exports = (sequelize, DataTypes) =>
	sequelize.define("followUser", {
		followID: {
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
		// userFollowedID: {
		// 	type: DataTypes.INTEGER,
		// 	foreignKey: true,
		// 	allowNull: false
		// }
	}, {
		// Don't add the timestamp attributes (updatedAt, createdAt).
		timestamps: false
	});
