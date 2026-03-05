import { Router } from "express";
import { addBlog } from "../controllers/blogController.js";

const router = Router()

router.post("/add",addBlog)

export default router