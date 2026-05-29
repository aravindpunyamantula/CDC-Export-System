import { Request, Response } from "express";
import { createJobMetadata } from "../utils/export.util";
import { getConsumerId } from "../utils/consumer.util";
import prisma from "../prisma";

import {startFullExportJob, startIncrementalExportJob, startDeltaExportJob} from "../jobs/export.job";

export async function fullExport(req: Request, res: Response) {
  try {
    const consumerId = getConsumerId(req);
    const { jobId, outputFileName } = createJobMetadata(consumerId, "full");

    void startFullExportJob(
      jobId,
      consumerId,
      outputFileName
    );

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
      void startIncrementalExportJob(
      jobId,
      consumerId,
      outputFileName
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
    void startDeltaExportJob(jobId, consumerId, outputFileName);
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
  try {
      const consumerId =
      getConsumerId(req);

    const watermark =
      await prisma.watermark.findUnique({
        where: {
          consumerId,
        },
      });

    if (!watermark) {
      return res.status(404).json({
        message:
          "No watermark found",
      });
    }

    return res.status(200).json({
      consumerId,
      lastExportedAt:
        watermark.lastExportedAt,
    });
  } catch (error : any) {
     return res.status(400).json({
      message: error.message,
    });
    
  }
  
}
