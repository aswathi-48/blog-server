import { Router } from "express";
import { addBlog, deleteBlog, getBlog, getSingleBlog, updateBlog } from "../controllers/blogController.js";
import authCheck from "../middlewares/authCheck.js";
import upload from "../middlewares/upload.js";

const router = Router()

router.use(authCheck)
router.post("/add", upload.single('thumbnail'), addBlog)
router.get("/get", getBlog)
router.get('/single', getSingleBlog)
router.patch('/update', upload.single('thumbnail'), updateBlog)
router.delete('/delete', deleteBlog)

export default router
