import express from 'express';
import { googleAuth, logout } from '../controllers/auth.controller.js';
import { authLimiter } from '../middlewares/rateLimiter.js';

const authrouter = express.Router();


authrouter.post("/google", authLimiter, googleAuth);
authrouter.get("/logout", logout);

export default authrouter;