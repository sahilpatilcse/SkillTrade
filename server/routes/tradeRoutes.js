const express = require("express");
const router = express.Router();
const tradeController = require("../controllers/tradeController.js");
const auth = require("../middleware/auth.js");

router.post("/send-request/:id", auth, tradeController.sendRequest);
router.get("/my-requests", auth, tradeController.getMyRequests);
router.get("/sent-requests", auth, tradeController.getSentRequests);
router.put("/request-status/:id", auth, tradeController.updateReqStatus);

module.exports = router;
