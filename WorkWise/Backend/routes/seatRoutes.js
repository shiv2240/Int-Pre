const { available, book, cancel } = require("../controllers/seatController.js");
const authenticate = require("../middlewares/auth.js");
const express = require("express");
const router = express.Router();

router.get("/available", available);
router.post("/book", authenticate, book);
router.post("/cancel", authenticate, cancel);

module.exports = router;
