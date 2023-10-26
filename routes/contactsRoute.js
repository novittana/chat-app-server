const {addContact, getAllContacts} = require("../controllers/contactsControllers");
const router = require("express").Router();

router.post("/addcontact", addContact);
router.get("/getallcontact", getAllContacts)



module.exports = router;