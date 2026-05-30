jest.mock("../src/jobs/export.job", () => ({
  startFullExportJob: jest.fn(),
  startIncrementalExportJob: jest.fn(),
  startDeltaExportJob: jest.fn(),
}));

import {
  fullExport,
  incrementalExport,
  deltaExport,
} from "../src/controllers/export.controller";

function createMockResponse() {
  const res: any = {};

  res.status = jest.fn().mockReturnValue(res);

  res.json = jest.fn().mockReturnValue(res);

  return res;
}

describe("Full Export Controller", () => {

  it("should return 202", async () => {

    const req: any = {
      header: () => "consumer-1",
    };

    const res = createMockResponse();

    await fullExport(req, res);

    expect(res.status)
      .toHaveBeenCalledWith(202);

  });

});
it("should return 400", async () => {

  const req: any = {
    header: () => undefined,
  };

  const res = createMockResponse();

  await fullExport(req, res);

  expect(res.status)
    .toHaveBeenCalledWith(400);

});
describe("Incremental Export", () => {

  it("should return 202", async () => {

    const req: any = {
      header: () => "consumer-1",
    };

    const res = createMockResponse();

    await incrementalExport(req, res);

    expect(res.status)
      .toHaveBeenCalledWith(202);

  });

});
describe("Delta Export", () => {

  it("should return 202", async () => {

    const req: any = {
      header: () => "consumer-1",
    };

    const res = createMockResponse();

    await deltaExport(req, res);

    expect(res.status)
      .toHaveBeenCalledWith(202);

  });

});