module.exports = (sequelize, DataTypes) =>
	sequelize.define("user", {
		userID: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING(32),
			allowNull: false
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		passwordHash: {
			type: DataTypes.STRING(96),
			allowNull: false
		},
		profilePic: {
			type: DataTypes.TEXT,
			allowNull: false
		},
	}, {
		// Add the timestamp attributes (updatedAt, createdAt).
		timestamps: true
	});
