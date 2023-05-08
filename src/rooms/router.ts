import Express from "express";
import { getRooms, getRoomById } from "./controller";
import upload from "../middleware/upload";

const router = Express.Router();

// Get /rooms
router.get("/", getRooms);
router.get("/:room_id", getRoomById);

export default router;
