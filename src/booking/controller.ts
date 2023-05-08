import { Request, Response } from "express";
import service from "./service";
import Booking from "./model";
import fs from "fs";

const getBookings = async (req: Request, res: Response) => {
  try {
    const booking = await service.getAllBookings();
    if (booking.length === 0) {
      return res.status(404).json({ message: "Bookings not found" });
    } else return res.status(200).json(booking);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getBookingsByUserId = async (req: Request, res: Response) => {
  const { user_id } = req.params;
  try {
    const booking = await service.getAllBookingsByUserId(user_id);
    if (booking.length === 0) {
      return res.status(404).json({ message: "Bookings not found" });
    } else return res.status(200).json(booking);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getBookingById = async (req: Request, res: Response) => {
  const { bk_id } = req.params;
  try {
    const booking = await service.getBookingById({ bk_id: parseInt(bk_id) });
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    } else return res.status(200).json(booking);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const createBooking = async (req: Request, res: Response) => {
  const {
    bk_cus_fname,
    bk_cus_lname,
    bk_cus_phone,
    bk_pet_amount,
    bk_pet_name,
    bk_pet_breed,
    checkin_date,
    checkout_date,
    room_id,
    user_id,
  } = req.body;
  console.log(req.body);
  try {
    const newBooking = await service.createBooking({
      bk_cus_fname,
      bk_cus_lname,
      bk_cus_phone,
      bk_pet_amount: parseInt(bk_pet_amount),
      bk_pet_name,
      bk_pet_breed,
      checkin_date: new Date(checkin_date),
      checkout_date: new Date(checkout_date),
      room_id,
      user_id,
    });
    return res.status(201).json(newBooking);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const updateBooking = async (req: Request, res: Response) => {
  const { bk_id } = req.params;
  const booking: { bk_status: number; payment_proof?: Buffer | null } =
    req.body;
  try {
    const bookings = await service.getBookingById({
      bk_id: parseInt(bk_id),
    });
    if (!bookings) {
      return res.status(404).json({ message: "Booking not found" });
    }

    let img: Buffer | null;
    if (req.file !== undefined) {
      img = fs.readFileSync(req.file.path);
      fs.unlinkSync(req.file.path);
    } else {
      img = null;
    }
    
    const updatedBooking = await service.updateBooking(
      { bk_id: parseInt(bk_id) },
      { ...booking, ...(img && { payment_proof: img }) }
    );
    return res.status(200).json(updatedBooking);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const deleteBooking = async (req: Request, res: Response) => {
  const { bk_id } = req.params;
  try {
    const bookings = await service.getBookingById({
      bk_id: parseInt(bk_id),
    });
    if (!bookings) {
      return res.status(404).json({ message: "Booking not found" });
    } else {
      const deletedBooking = await service.deleteBooking({
        bk_id: parseInt(bk_id),
      });
      return res.status(200).json(deletedBooking);
    }
  } catch (e) {
    return res.status(500).json(e);
  }
};

export {
  getBookings,
  getBookingsByUserId,
  getBookingById,
  createBooking,
  updateBooking,
  deleteBooking,
};
