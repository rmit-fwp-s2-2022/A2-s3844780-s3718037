module.exports = (express, app) => {
  const controller = require("../controllers/reaction.controller.js");
  const router = express.Router();

  // Select thread reactions.
  router.get("/threads", controller.getThreadReactions);

  // Select comment reactions.
  router.get("/comments", controller.getCommentReactions);

  // Create a new thread reaction.
  router.post("/TReaction", controller.createTReaction);

  // Create a new comment reaction.
  router.post("/CReaction", controller.createCReaction);

  // Update reaction
  router.put("/update", controller.update);

  // Select all reactions based off a threadID.
  router.get("/allTReactions", controller.allTReactions);

  // Select all reactions based off a commentID.
  router.get("/allCReactions", controller.allCReactions);

  // Add routes to server.
  app.use("/api/reactions", router);
};
