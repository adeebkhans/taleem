const express = require("express");
const { getAllEvents, createEvent, getEventById, deleteEvent, attendEvent, commentOnEvent, getCommentsByEventId } = require("../controllers/communityController");
const  authMiddleware  = require("../controllers/authMiddleware");

const router = express.Router();

router.get("/", getAllEvents);
router.post("/", authMiddleware, createEvent);
router.get("/:id", getEventById);
router.delete("/:id", authMiddleware, deleteEvent);
router.post("/:id/attend", authMiddleware, attendEvent);
router.post("/:id/comment", authMiddleware, commentOnEvent);
router.get("/:id/comments", getCommentsByEventId);

module.exports = router;
