import { Express } from "express";
import { login, auth } from "./controller";

const router = Express.Router();

// POST /auth/login
router.post("/login", login);

// GET /auth/auth/:token
router.get("/auth/:token", auth);

export default router;
