jest.mock("../src/prisma", () => ({
  user: {
    findMany: jest.fn(),
  },
  watermark: {
    findUnique: jest.fn(),
  },
}));

jest.mock("../src/services/csv.service", () => ({
  writeCsv: jest.fn(),
}));

jest.mock("../src/utils/watermark.util", () => ({
  updateWatermarkFromUsers: jest.fn(),
}));

import prisma from "../src/prisma";

import {
  runFullExport,
  runIncrementalExport,
  runDeltaExport,
} from "../src/services/export.service";

import { writeCsv }
from "../src/services/csv.service";

describe("Export Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should run full export", async () => {

    (prisma.user.findMany as jest.Mock)
      .mockResolvedValue([]);

    await runFullExport(
      "consumer-1",
      "test.csv"
    );

    expect(
      prisma.user.findMany
    ).toHaveBeenCalled();

    expect(writeCsv)
      .toHaveBeenCalled();

  });

  it("should throw when watermark missing", async () => {

    (prisma.watermark.findUnique as jest.Mock)
      .mockResolvedValue(null);

    await expect(
      runIncrementalExport(
        "consumer-1",
        "test.csv"
      )
    ).rejects.toThrow(
      "No watermark found"
    );

  });

  it("should run incremental export", async () => {

    (prisma.watermark.findUnique as jest.Mock)
      .mockResolvedValue({
        lastExportedAt:
          new Date(),
      });

    (prisma.user.findMany as jest.Mock)
      .mockResolvedValue([]);

    await runIncrementalExport(
      "consumer-1",
      "test.csv"
    );

    expect(writeCsv)
      .toHaveBeenCalled();

  });

  it("should run delta export", async () => {

    (prisma.watermark.findUnique as jest.Mock)
      .mockResolvedValue({
        lastExportedAt:
          new Date(),
      });

    (prisma.user.findMany as jest.Mock)
      .mockResolvedValue([
        {
          id: 1,
          name: "John",
          email: "john@test.com",
          createdAt: new Date(),
          updatedAt: new Date(),
          isDeleted: false,
        },
      ]);

    await runDeltaExport(
      "consumer-1",
      "test.csv"
    );

    expect(writeCsv)
      .toHaveBeenCalled();

  });

});