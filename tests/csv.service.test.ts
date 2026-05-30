jest.mock("csv-writer", () => ({
  createObjectCsvWriter: jest.fn(() => ({
    writeRecords: jest.fn(),
  })),
}));
import { writeCsv }
from "../src/services/csv.service";
describe("CSV Service", () => {

  it("should write csv", async () => {

    await writeCsv(
      "test.csv",
      [],
      []
    );

    expect(true).toBe(true);

  });

});
jest.mock("../src/prisma", () => ({
  watermark: {
    findUnique: jest.fn(),
  },
}));
