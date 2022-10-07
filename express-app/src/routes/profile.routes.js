module.exports = (express, app) => {
	const controller = require("../controllers/profile.controller.js");
	const router = express.Router();

	// Update profile
	router.put("/update", controller.update);
	
	// Delete Profile
	router.delete("/delete", controller.delete);

	// Add routes to server.
	app.use("/api/profiles", router);
};
