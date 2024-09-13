const express = require('express');
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { registerUser, loginUser, getHistory } = require("../controllers/userControllers")

router.route("/").post(registerUser);
router.route("/").get(loginUser);
router.route("/history").get(getHistory);
module.exports = router;