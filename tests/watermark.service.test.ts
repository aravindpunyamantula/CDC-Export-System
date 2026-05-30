jest.mock("../src/prisma", () => ({
  watermark: {
    upsert: jest.fn(),
  },
}));

import prisma from "../src/prisma";

import {
  updateWatermark,
} from "../src/services/watermark.service";

describe("Watermark Service", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call prisma upsert", async () => {

    (prisma.watermark.upsert as jest.Mock)
      .mockResolvedValue({
        consumerId: "consumer-1",
      });

    await updateWatermark(
      "consumer-1",
      new Date()
    );

    expect(
      prisma.watermark.upsert
    ).toHaveBeenCalledTimes(1);

  });

});