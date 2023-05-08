import Express from "express";
import { getBookings, getBookingsByUserId, getBookingById, createBooking, updateBooking, deleteBooking } from "./controller";
import upload from "../middleware/upload";

const router = Express.Router();

// Get /booking
router.get("/", getBookings);
router.get("/user/:user_id", getBookingsByUserId);
router.get("/:bk_id", getBookingById);

// Post /booking
router.post("/", createBooking);

// Put /booking:id
router.put("/:bk_id", upload.single("payment_proof"), updateBooking);

// Delete /booking:id
router.delete("/:bk_id", deleteBooking);

export default router;
