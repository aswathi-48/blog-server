import { Router } from "express";
import { addBlog, getBlog, getSingleBlog, updateBlog } from "../controllers/blogController.js";

const router = Router()

router.post("/add",addBlog)
router.get("/get",getBlog)
router.get('/single',getSingleBlog)
router.patch('/update',updateBlog)

export default router