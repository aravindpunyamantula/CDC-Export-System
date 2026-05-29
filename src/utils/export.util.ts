import {ExportType} from "../types/export.types";
import { randomUUID } from "crypto";

export function createJobMetadata(consumerId : string, exportType: ExportType){
    const jobId = randomUUID();
    const timestamp = Date.now();

    const outputFileName = `${exportType}_${consumerId}_${timestamp}.csv`;

    return {
        jobId,
        outputFileName
    }
}