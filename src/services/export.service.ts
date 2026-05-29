import prisma from "../prisma";
import { createObjectCsvWriter } from "csv-writer";
import path from "path";
import { updateWatermark } from "./watermark.service";
import { USER_EXPORT_HEADERS, DELTA_EXPORT_HEADERS } from "../utils/csvHeaders";
import { writeCsv } from "./csv.service";
import { updateWatermarkFromUsers } from "../utils/watermark.util";
import { getOutputPath } from "../utils/file.util";
import { write } from "fs";

export async function runFullExport(
    consumerId: string,
    outputFilename: string
) {
    console.log(`Running full Export for ${consumerId}`);
    const users = await prisma.user.findMany({
        where: {
            isDeleted: false,
        },
        orderBy: {
            updatedAt: "asc",
        }
    });

    const outputPath = getOutputPath(outputFilename);

    await writeCsv(
        outputPath,
        USER_EXPORT_HEADERS,
        users
    );

    await updateWatermarkFromUsers(consumerId, users);
}

export async function runIncrementalExport(
    consumerId: string,
    outputFilename: string
) {
    const watermark =
        await prisma.watermark.findUnique({
            where: {
                consumerId,
            },
        });

    if (!watermark) {
        throw new Error(
            "No watermark found. Run full export first."
        );
    }

    const users =
        await prisma.user.findMany({
            where: {
                isDeleted: false,

                updatedAt: {
                    gt: watermark.lastExportedAt,
                },
            },

            orderBy: {
                updatedAt: "asc",
            },
        });

    const outputPath = getOutputPath(outputFilename);

    await writeCsv(
        outputPath,
        USER_EXPORT_HEADERS,
        users
    );

    await updateWatermarkFromUsers(consumerId, users);

    console.log(
        `Incremental export rows: ${users.length}`
    );
}

export async function runDeltaExport(
    consumerId: string,
    outputFilename: string
) {
    const watermark =
        await prisma.watermark.findUnique({
            where: {
                consumerId,
            },
        });

    if (!watermark) {
        throw new Error(
            "No watermark found. Run full export first."
        );
    }

    const users =
        await prisma.user.findMany({
            where: {
                updatedAt: {
                    gt: watermark.lastExportedAt,
                },
            },

            orderBy: {
                updatedAt: "asc",
            },
        });

    const deltaRows = users.map((user: any) => {

        let operation = "UPDATE";

        if (user.isDeleted) {
            operation = "DELETE";
        } else if (
            user.createdAt.getTime() ===
            user.updatedAt.getTime()
        ) {
            operation = "INSERT";
        }

        return {
            operation,

            id: user.id.toString(),

            name: user.name,

            email: user.email,

            createdAt: user.createdAt,

            updatedAt: user.updatedAt,

            isDeleted: user.isDeleted,
        };
    });

    const outputPath = getOutputPath(outputFilename);

    await writeCsv(
        outputPath,
        DELTA_EXPORT_HEADERS,
        deltaRows
    );

    await updateWatermarkFromUsers(consumerId, users);

    console.log(
        `Delta export rows: ${users.length}`
    );
}

