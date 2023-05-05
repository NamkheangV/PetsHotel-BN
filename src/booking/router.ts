import Express from "express";
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking } from "./controller";
import upload from "../middleware/upload";

const router = Express.Router();

// Get /bookings
router.get("/", getBookings);
router.get("/:bk_id", getBookingById);

// Post /bookings
router.post("/", upload.single("bk_pet_image"), createBooking);

// Put /bookings:id
router.put("/:bk_id", upload.single("bk_pet_image"), updateBooking);

// Delete /bookings:id
router.delete("/:bk_id", deleteBooking);

export default router;
