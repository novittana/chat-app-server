const {register,login, getAllUsers, getUser, setAvatar} = require("../controllers/userControllers");
const router = require("express").Router();

router.post("/register", register);
router.post("/login", login);
router.get("/allusers/:id", getAllUsers);
router.get("/:id", getUser);
router.post("/setavatar/:id", setAvatar);


module.exports = router;