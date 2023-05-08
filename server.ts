import express, { Request, Response} from 'express'
import cors from "cors";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server!!");
});

app.listen(port, () => {
  console.log(`[Server]: Server is running at http://localhost:${port}`);
});

import usersRouter from "./src/users/router";
app.use("/users", usersRouter);

import authRouter from "./src/auth/router";
app.use("/auth", authRouter);

import booking from "./src/booking/router";
app.use("/booking", booking);

import rooms from "./src/rooms/router";
app.use("/rooms", rooms);

