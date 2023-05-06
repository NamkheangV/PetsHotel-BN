import Express from "express";
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from "./controller";
import upload from "../middleware/upload";

const router = Express.Router();

// Get /booking
router.get("/", getBookings);
router.get("/:bk_id", getBookingById);

// Post /booking
router.post("/", upload.single("payment_proof"), createBooking);

// Put /booking:id
router.put("/:bk_id", updateBooking);

// Delete /booking:id
router.delete("/:bk_id", deleteBooking);

export default router;
