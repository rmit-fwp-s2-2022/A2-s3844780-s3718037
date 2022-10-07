module.exports = (sequelize, DataTypes) =>
	sequelize.define("comment", {
		commentID: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		// threadID: {
		// 	type: DataTypes.INTEGER,
		// 	foreignKey: true,
		// 	allowNull: false
		// },
		// userID: {
		// 	type: DataTypes.INTEGER,
		// 	foreignKey: true,
		// 	allowNull: false
		// },
		commentText: {
			type: DataTypes.TEXT
		},
	}, {
		// Add the timestamp attributes (updatedAt, createdAt).
		timestamps: true
	});
