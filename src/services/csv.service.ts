import { createObjectCsvWriter } from "csv-writer";

export async function writeCsv(
  outputPath: string,
  headers: any[],
  records: any[]
) {
  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: headers,
  });

  await csvWriter.writeRecords(records);
}