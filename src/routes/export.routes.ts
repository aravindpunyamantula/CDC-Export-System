import { Router } from "express";
import {
  fullExport,
  incrementalExport,
  deltaExport,
  getWatermark,
} from "../controllers/export.controller";

const router = Router();

router.post("/full", fullExport);

router.post("/incremental", incrementalExport);

router.post("/delta", deltaExport);

router.get("/watermark", getWatermark);

export default router;