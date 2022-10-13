module.exports = (express, app) => {
  const controller = require("../controllers/thread.controller.js");
  const router = express.Router();

  // Select all threads.
  router.get("/", controller.all);

  // Select a single thread with ID.
  router.get("/select/:id", controller.one);

  // Create a new thread.
  router.post("/", controller.create);

  // Delete thread based off threadID
  router.delete("/delete/:id", controller.deleteThread);

  // Delete thread based off userID
  router.delete("/deleteFromUserID/:id", controller.deleteThreadUserID);

  // Update thread
  router.put("/update", controller.update);

  // Add routes to server.
  app.use("/api/threads", router);
};
