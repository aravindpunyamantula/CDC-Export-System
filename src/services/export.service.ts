import prisma from "../prisma";
import { createObjectCsvWriter} from "csv-writer";
import path from "path";
import {updateWatermark} from "./watermark.service";

export async function runFullExport(
    consumerId: string,
    outputFilename: string
){
    console.log(`Running full Export for ${consumerId}`);
    const users = await prisma.user.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            updatedAt: "asc",
        }
    });

     const outputPath = path.join(
    process.cwd(),
    "output",
    outputFilename
  );

  const csvWriter = createObjectCsvWriter({
    path: outputPath,
    header: [
      { id: "id", title: "id" },
      { id: "name", title: "name" },
      { id: "email", title: "email" },
      { id: "createdAt", title: "created_at" },
      { id: "updatedAt", title: "updated_at" },
      { id: "isDeleted", title: "is_deleted" },
    ],
  });

   await csvWriter.writeRecords(users);

   const latestTimestamp =
  users.length > 0
    ? users[users.length - 1].updatedAt
    : new Date();
    
    console.log(
    `Exported ${users.length} rows`
  );
  await updateWatermark(consumerId, latestTimestamp);
  console.log(
  `Updated watermark: ${latestTimestamp.toISOString()}`
);
}

