import { Router } from "express";
import { login, profileView, register } from "../controllers/userController.js";

const router = Router()
router.post('/register',register)
router.post('/login',login)
router.get('/profile',profileView)

export default router