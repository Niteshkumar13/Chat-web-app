const express = require("express");
const {changeNameDP,localStorage,addStatus,deleteStatus} = require("../controllers/auth.controller");
const {deleteMessage} = require("../controllers/message.controller")
const protectRoute = require("../middleware/protectRoute");
const router = express.Router();
router.post("/",protectRoute,changeNameDP);
router.post("/changeLocalStorage",localStorage);
router.post("/addStatus",protectRoute,addStatus)
router.post("/deleteStatus",protectRoute,deleteStatus)
router.post("/deleteMessage/:id",protectRoute,deleteMessage)
module.exports = router; 