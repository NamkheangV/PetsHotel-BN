import Express from "express";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./controller.js";

const router = Express.Router();

// GET /users
router.get("/", getUsers);
router.get("/:id", getUser);

// POST /users
router.post("/", createUser);

// PUT /users/:id
router.put("/:id", updateUser);

// DELETE /users/:id
router.delete("/:id", deleteUser);

export default router;
