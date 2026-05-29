import { Request, Response } from "express";
import { createJobMetadata } from "../utils/export.util";
import { getConsumerId } from "../utils/consumer.util";

export async function fullExport(req: Request, res: Response) {
  try {
    const consumerId = getConsumerId(req);
    const { jobId, outputFileName } = createJobMetadata(consumerId, "full");

    return res.status(202).json({
      jobId,
      status: "started",
      exportType: "full",
      outputFileName,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function incrementalExport(req: Request, res: Response) {
  try {
    const consumerId = getConsumerId(req);
    const { jobId, outputFileName } = createJobMetadata(
      consumerId,
      "incremental",
    );
    return res.status(202).json({
      jobId,
      status: "started",
      exportType: "incremental",
      outputFileName,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function deltaExport(req: Request, res: Response) {
  try {
    const consumerId = getConsumerId(req);
    const { jobId, outputFileName } = createJobMetadata(consumerId, "delta");
    return res.status(202).json({
      jobId,
      status: "started",
      exportType: "delta",
      outputFileName,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message,
    });
  }
}

export async function getWatermark(req: Request, res: Response) {
  return res.status(200).json({
    message: "Watermark endpoint",
  });
}
