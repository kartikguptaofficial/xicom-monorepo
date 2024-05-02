import express from "express";
import cors from "cors";
import AppRoutes from "./routes/index.route";

const app = express();

app.use(cors({
  origin: (origin: any, callback: any) => {
    callback(null, true);
  },
  credentials: true
}));


app.use(
  express.urlencoded()
);

app.use(
  express.json()
);

app.use("/v1", AppRoutes);

export default app;