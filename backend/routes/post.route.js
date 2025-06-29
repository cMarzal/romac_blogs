import express from "express";
import {
  getPosts,
  getAdminPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  featurePost,
  PublishPost,
  updatePost
} from "../controllers/post.controller.js";
import increaseVisit from "../middlewares/increaseVisit.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);
router.get("/admin-posts", getAdminPosts);

router.get("/", getPosts);
router.get("/:slug", increaseVisit, getPost);
router.post("/", createPost);
router.delete("/:id", deletePost);
router.patch("/feature", featurePost);
router.patch("/publish", PublishPost);
router.put("/:slug", updatePost);

export default router;