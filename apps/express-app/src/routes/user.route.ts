import express from "express";
import { catchAsync } from "../utils/catchAsync.util";
import { userController } from "../controllers/user.controller";

const app = express();

app.post("/", catchAsync(userController))

export default app;