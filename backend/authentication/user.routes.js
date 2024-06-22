const express = require("express");
const protectRoute = require("../middleware/protectRoute");
const {getUsers,chattedUser,getStatusView} = require("../controllers/users.controller");
const router = express.Router();
router.get("/",protectRoute,getUsers);
router.get("/chatData",protectRoute,chattedUser);
router.get("/statusView",protectRoute,getStatusView);
module.exports = router; 