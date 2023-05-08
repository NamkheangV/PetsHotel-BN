import { Request, Response } from "express";
import service from "./service";
import Rooms from "./model";
import fs from "fs";

const getRooms = async (req: Request, res: Response) => {
  try {
    const rooms =  await service.getAllRooms();
    if (rooms.length === 0) {
      return res.status(404).json({ message: "Rooms not found" });
    } else return res.status(200).json(rooms);
  } catch (e) {
    console.log(e);
    return res.status(500).json(e);
  }
};

const getRoomById = async (req: Request, res: Response) => {
  const { room_id } = req.params;
  try {
    const room = await service.getRoomById({ room_id });
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    } else return res.status(200).json(room);
  } catch (e) {
    return res.status(500).json(e);
  }
};

export { getRooms, getRoomById };
