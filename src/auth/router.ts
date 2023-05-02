import Express from "express";
import { login } from "./controller";

const router = Express.Router();

// Post /auth
router.post("/", login);

export default router;