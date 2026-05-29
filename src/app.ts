import express from "express";
import cors from "cors";

import exportRoutes from "./routes/export.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

app.use("/exports", exportRoutes);

export default app;