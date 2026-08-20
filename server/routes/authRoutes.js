const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController.js");
const auth = require('../middleware/auth.js');

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.get("/me", auth, authController.getMe);
router.put("/update-profile", auth, authController.updateProfile);
router.get("/browse", auth, authController.browseUsers);

module.exports = router;
