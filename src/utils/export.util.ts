import {v4 as uuid4 } from "uuid";
import {ExportType} from "../types/export.types";

export function createJobMetadata(consumerId : string, exportType: ExportType){
    const jobId = uuid4();
    const timestamp = Date.now();

    const outputFileName = `${exportType}_${consumerId}_${timestamp}.csv`;

    return {
        jobId,
        outputFileName
    }
}