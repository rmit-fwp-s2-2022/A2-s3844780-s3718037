module.exports = (express, app) => {
  const controller = require("../controllers/comment.controller.js");
  const router = express.Router();

  // Select all comments.
  router.get("/", controller.all);

  // Select a single comment based on ID.
  router.get("/select/:id", controller.one);

  // Create a new comment.
  router.post("/", controller.create);

  // Add routes to server.
  app.use("/api/comments", router);
};
