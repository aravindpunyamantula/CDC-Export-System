jest.mock("../src/services/export.service", () => ({
  runFullExport: jest.fn(),
  runIncrementalExport: jest.fn(),
  runDeltaExport: jest.fn(),
}));

import {
  startFullExportJob,
  startIncrementalExportJob,
  startDeltaExportJob,
} from "../src/jobs/export.job";

import {
  runFullExport,
  runIncrementalExport,
  runDeltaExport,
} from "../src/services/export.service";

describe("Export Jobs", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should execute full export job", async () => {

    (runFullExport as jest.Mock)
      .mockResolvedValue(undefined);

    await startFullExportJob(
      "job-1",
      "consumer-1",
      "file.csv"
    );

    expect(runFullExport)
      .toHaveBeenCalledTimes(1);

  });

  it("should execute incremental export job", async () => {

    (runIncrementalExport as jest.Mock)
      .mockResolvedValue(undefined);

    await startIncrementalExportJob(
      "job-1",
      "consumer-1",
      "file.csv"
    );

    expect(runIncrementalExport)
      .toHaveBeenCalledTimes(1);

  });

  it("should execute delta export job", async () => {

    (runDeltaExport as jest.Mock)
      .mockResolvedValue(undefined);

    await startDeltaExportJob(
      "job-1",
      "consumer-1",
      "file.csv"
    );

    expect(runDeltaExport)
      .toHaveBeenCalledTimes(1);

  });

  it("should handle full export failure", async () => {

    (runFullExport as jest.Mock)
      .mockRejectedValue(
        new Error("boom")
      );

    await startFullExportJob(
      "job-1",
      "consumer-1",
      "file.csv"
    );

    expect(runFullExport)
      .toHaveBeenCalled();

  });

});