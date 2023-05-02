import { Request, Response } from "express";
import service from "./service";
import Users from "./model";
import path from "path";
import fs from "fs";

const getUsers = async (req: Request, res: Response) => {
    try {
        const users: Users[] = await service.getAllUsers();
        if (users.length === 0) {
            return res.status(404).json({ message: "Users not found" });
        } else
            return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const getUserById = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const users: Users | null = await service.getUserById({ user_id: user_id });
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        } else
            return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json(e);
    }
}

const createUser = async (req: Request, res: Response) => {
    const { user_id, user_pass, user_email } = req.body;
    console.log(req.body);

    const checkID: Users | null = await service.getUserById({ user_id: user_id });
    if (checkID) {
        return res.status(409).json({ message: "User ID already exists" });
    }
    
    try {
        const users: Users = await service.createUser({ user_id, user_pass, user_email});
        if (users) {
            return res.status(201).json(users);
        } else 
            return res.status(400).json({ message: "Failed to create user" });
    } catch (e) {
        // console.log(e);
        return res.status(500).json(e);
    }
}

const updateUser = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    const user :{user_pass?: string, user_email?: string, user_fname?: string, user_lname?: string, user_phone?: string} = req.body;
    try {
        
        const users: Users | null = await service.getUserById({ user_id: user_id });
        if (!users) {
            return res.status(404).json({ message: "User not found" });
        } 
        let img: Buffer | null;
            if (req.file !== undefined) {
               const uploadPath = path.join(process.cwd(), "dist/src/assets/upload");
               img = fs.readFileSync(uploadPath + req.file.filename);
                fs.unlinkSync(uploadPath + req.file.filename);
            } else {
                img = null;
            }
            await service.updateUser( {user_id: user_id}, {...user, ...(img && {user_image: img}) });   
    } catch (e) {
        return res.status(500).json(e);
     }
}

const deleteUser = async (req: Request, res: Response) => {
    const { user_id } = req.params;
    try {
        const users: Users = await service.deleteUser({ user_id: user_id });
        if (users) {
            return res.status(200).json(users);
        } else
            return res.status(500).json({ message: "Failed to delete user" });
    } catch (e) {
        return res.status(500).json(e);
    }
}

export { getUsers, getUserById, createUser, updateUser, deleteUser };