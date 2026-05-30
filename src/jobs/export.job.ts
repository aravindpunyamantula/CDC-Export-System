import { runFullExport, runIncrementalExport, runDeltaExport } from "../services/export.service";

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

        const startTime = Date.now();
        await runFullExport(consumerId, outputFilename);
        const durationMs = Date.now() - startTime;

        console.log(
            JSON.stringify({
                event: "EXPORT_JOB_COMPLETED",
                jobId,
                consumerId,
                exportType: "full",
                 durationMs,
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

export async function startIncrementalExportJob(
  jobId: string,
  consumerId: string,
  outputFilename: string
) {
  try {

    console.log(
      JSON.stringify({
        event:
          "EXPORT_JOB_STARTED",
        jobId,
        consumerId,
        exportType:
          "incremental",
      })
    );

    const startTime = Date.now();

    await runIncrementalExport(
      consumerId,
      outputFilename
    );

    const durationMs = Date.now() - startTime;

    console.log(
      JSON.stringify({
        event:
          "EXPORT_JOB_COMPLETED",
        jobId,
        consumerId,
        exportType:
          "incremental",
          durationMs,
      })
    );

  } catch (error) {

    console.error(
      JSON.stringify({
        event:
          "EXPORT_JOB_FAILED",
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

export async function startDeltaExportJob(
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
        exportType: "delta",
      })
    );

    const startTime = Date.now();

    await runDeltaExport(
      consumerId,
      outputFilename
    );

    const durationMs = Date.now() - startTime;

    console.log(
      JSON.stringify({
        event: "EXPORT_JOB_COMPLETED",
        jobId,
        consumerId,
        exportType: "delta",
        durationMs,
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

