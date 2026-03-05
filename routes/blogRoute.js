import { Router } from "express";
import { addBlog, getBlog, getSingleBlog } from "../controllers/blogController.js";

const router = Router()

router.post("/add",addBlog)
router.get("/get",getBlog)
router.get('/single',getSingleBlog)

export default router