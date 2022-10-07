module.exports = (sequelize, DataTypes) =>
	sequelize.define("thread", {
		threadID: {
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
		post: {
			type: DataTypes.TEXT
		},
		postPic: {
			type: DataTypes.TEXT
		},
	}, {
		// Add the timestamp attributes (updatedAt, createdAt).
		timestamps: true
	});
