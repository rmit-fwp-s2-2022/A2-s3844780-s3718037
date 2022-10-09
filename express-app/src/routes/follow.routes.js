module.exports = (express, app) => {
  const controller = require("../controllers/follow.controller.js");
  const router = express.Router();

  // Is user following this user?
  router.get("/", controller.isFollow);

  // Unfollow a user
  router.delete("/", controller.unfollow);

  // Follow a user
  router.post("/", controller.follow);

  // Add routes to server.
  app.use("/api/follows", router);
};
