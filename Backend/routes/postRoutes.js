const express = require("express");
const {
  getAllPosts,
  createPost,
  getPostById,
  updatePost,
  deletePost,
  likePost,
  commentOnPost,
  getCommentsByPostId
} = require("../controllers/communityController");
const authMiddleware = require("../controllers/authMiddleware");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", authMiddleware, createPost);
router.get("/:id", getPostById);
router.put("/:id", authMiddleware, updatePost);
router.delete("/:id", authMiddleware, deletePost);
router.post("/:id/like", authMiddleware, likePost);
router.post("/:id/comment", authMiddleware, commentOnPost);
router.get("/:id/comments", getCommentsByPostId);

module.exports = router;
