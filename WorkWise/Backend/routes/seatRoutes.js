const { available, book, cancel, resetAll } = require("../controllers/seatController.js");
const authenticate = require("../middlewares/auth.js");
const express = require("express");
const router = express.Router();

router.get("/available", available);
router.post("/book", authenticate, book);
router.post("/cancel", authenticate, cancel);
router.post("/resetAll",authenticate, resetAll)

module.exports = router;
