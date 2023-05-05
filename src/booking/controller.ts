import { Request, Response } from "express";
import service from "./service";
import Booking from "./model";
import fs from "fs";

const getBookings = async (req: Request, res: Response) => {
    try {
        const bookings: Booking[] = await service.getAllBookings();
        if (bookings.length === 0) {
            return res.status(404).json({ message: "Bookings not found" });
        } else
            return res.status(200).json(bookings);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const getBookingById = async (req: Request, res: Response) => {
    const { bk_id } = req.params;
    try {
        const booking: Booking | null = await service.getBookingById({ bk_id: parseInt(bk_id)  });
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        } else
            return res.status(200).json(booking);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const createBooking = async (req: Request, res: Response) => {
    const { bk_cus_fname, bk_cus_lname, bk_cus_phone, bk_pet_amount, bk_pet_name, bk_pet_breed, checkin_date, checkout_date, total_price, payment_proof, room_id, user_id } = req.body;
    console.log(req.body);
    try {
        let img: Buffer;
        if (req.file === undefined) return res.status(400).json({ message: "Please upload a file!" });
            img = fs.readFileSync(req.file.path);
            fs.unlinkSync(req.file.path);
      
        const newBooking: Booking = await service.createBooking({
            bk_cus_fname, bk_cus_lname, bk_cus_phone, bk_pet_amount, bk_pet_name, bk_pet_breed,
            bk_pet_image: img, checkin_date, checkout_date, total_price, payment_proof, room_id, user_id
        });
        return res.status(201).json(newBooking);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const updateBooking = async (req: Request, res: Response) => {
    const { bk_id } = req.params;
    const booking: { bk_status: number } = req.body;
    try {
        const bookings: Booking | null = await service.getBookingById({ bk_id: parseInt(bk_id) });
        if (!bookings) {
            return res.status(404).json({ message: "Booking not found" });
        } else {
            const updatedBooking: Booking = await service.updateBooking({ bk_id: parseInt(bk_id) }, booking);
            return res.status(200).json(updatedBooking);
        }
    } catch (e) {
        return res.status(500).json(e);
    }
}

const deleteBooking = async (req: Request, res: Response) => {
    const { bk_id } = req.params;
    try {
        const bookings: Booking | null = await service.getBookingById({ bk_id: parseInt(bk_id) });
        if (!bookings) {
            return res.status(404).json({ message: "Booking not found" });
        } else {
            const deletedBooking: Booking = await service.deleteBooking({ bk_id: parseInt(bk_id) });
            return res.status(200).json(deletedBooking);
        }
    } catch (e) {
        return res.status(500).json(e);
    }
}

export { getBookings, getBookingById, createBooking, updateBooking, deleteBooking };

