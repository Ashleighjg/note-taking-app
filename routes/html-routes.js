const router = require("express").Router();
const path = require("path");


// GET Route for notes page
router.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/notes.html"))
);

// Wildcard route to direct users to index.html
router.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../public/index.html"))
);



module.exports = router;
