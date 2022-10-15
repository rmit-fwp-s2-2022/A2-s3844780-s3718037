const express = require("express");
const cors = require("cors");
const db = require("./src/database");

// Database will be sync'ed in the background.
db.sync();

const app = express();

// Parse requests of content-type - application/json.
app.use(express.json());

// Add CORS suport.
app.use(cors());

// Simple Hello World route.
app.get("/", (req, res) => {
  res.json({ message: "Hello World!" });
});

// Add user routes.
require("./src/routes/user.routes.js")(express, app);
require("./src/routes/profile.routes.js")(express, app);
require("./src/routes/follow.routes.js")(express, app);
require("./src/routes/thread.routes.js")(express, app);
require("./src/routes/comment.routes.js")(express, app);
require("./src/routes/reaction.routes.js")(express, app);

// Set port, listen for requests.
const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
