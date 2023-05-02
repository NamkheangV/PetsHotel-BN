import { Request, Response } from "express";
import service from "../users/service";

const login = async (req: Request, res: Response) => {
    const { user_id, user_pass } = req.body;

    try {
        const user = await service.getUserById({ user_id: user_id });

        if (!user) { 
            return res.status(404).json({ message: "User not found" });
        }
        
        if (user.user_pass !== user_pass) { 
            return res.status(401).json({ message: "Invalid password" });
        }
        
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json(e);
    }
}

export { login };