import express from "express";
import { catchAsync } from "../utils/catchAsync.util";
import { authLoginController, authRegisterController, sendAuthOTPController, verifyAuthOTPController } from "../controllers/auth.controller";
const app = express();

app.post("/login", catchAsync(authLoginController));
app.post("/register", catchAsync(authRegisterController));
app.post("/register-mobile", catchAsync(sendAuthOTPController));
app.post("/verify-mobile", catchAsync(verifyAuthOTPController));

export default app;