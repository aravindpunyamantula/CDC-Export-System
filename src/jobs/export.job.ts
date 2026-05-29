import { runFullExport } from "../services/export.service";

export async function startFullExportJob(
    jobId: string,
    consumerId: string,
    outputFilename: string
) {
    try {
        console.log(
            JSON.stringify({
                event: "EXPORT_JOB_STARTED",
                jobId,
                consumerId,
                exportType: "full",
            }));

        await runFullExport(consumerId, outputFilename);

        console.log(
            JSON.stringify({
                event: "EXPORT_JOB_COMPLETED",
                jobId,
                consumerId,
                exportType: "full",
            })
        );
    } catch (error) {
        console.error(
            JSON.stringify({
                event: "EXPORT_JOB_FAILED",
                jobId,
                consumerId,
                error:
                    error instanceof Error
                        ? error.message
                        : "Unknown error",
            })
        );

    }
}
