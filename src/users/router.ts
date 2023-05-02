import Express from "express";
import { getUsers, getUserById, createUser, updateUser, deleteUser } from "./controller";
import upload from "../middleware/upload";

const router = Express.Router();

// Get /users
router.get("/", getUsers);
router.get("/:user_id", getUserById);

// Post /users
router.post("/", upload.single("user_img"), createUser);

// Put /users:id
router.put("/:user_id", upload.single("user_img"), updateUser);

// Delete /users:id
router.delete("/:user_id", deleteUser);

export default router;