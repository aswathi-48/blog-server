import { Router } from "express";
import { addBlog, getBlog } from "../controllers/blogController.js";

const router = Router()

router.post("/add",addBlog)
router.get("/get",getBlog)

export default router