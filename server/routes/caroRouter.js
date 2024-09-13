const express = require("express");
const { allMoves, createCaro } = require("../controllers/caroControllers");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();


router.route('/:caroId').get(protect, allMoves);
router.route('/friend').post(createCaro);

module.exports = router