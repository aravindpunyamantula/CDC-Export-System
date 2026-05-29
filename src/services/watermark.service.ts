import prisma from "../prisma";

export async function updateWatermark(
  consumerId: string,
  lastExportedAt: Date
) {
  return prisma.watermark.upsert({
    where: {
      consumerId,
    },

    update: {
      lastExportedAt,
    },

    create: {
      consumerId,
      lastExportedAt,
    },
  });
}