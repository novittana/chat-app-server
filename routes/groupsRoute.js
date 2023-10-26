const {addGroup} = require("../controllers/groupControllers");
const router = require("express").Router();

router.post("/addgroup", addGroup);

module.exports = router;