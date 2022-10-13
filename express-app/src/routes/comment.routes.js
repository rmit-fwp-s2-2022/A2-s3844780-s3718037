module.exports = (express, app) => {
  const controller = require("../controllers/comment.controller.js");
  const router = express.Router();

  // Select all comments.
  router.get("/", controller.all);

  // Select all comments based of threadID
  router.get("/all", controller.allByThreadID);

  // Select a single comment based on ID.
  router.get("/select/:id", controller.one);

  // Create a new comment.
  router.post("/", controller.create);

  // Delete comments
  router.delete("/delete/:id", controller.deleteComments);

  // Add routes to server.
  app.use("/api/comments", router);
};
