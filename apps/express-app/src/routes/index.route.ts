import express from "express";
import UserRoutes from "./user.route";

const app = express();

app.use("/user", UserRoutes);

export default app;