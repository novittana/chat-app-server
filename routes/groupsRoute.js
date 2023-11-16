const {addGroup, getGroups} = require("../controllers/groupControllers");
const router = require("express").Router();

router.post("/", addGroup);
router.get("/:userId", getGroups);

module.exports = router;