jest.mock(
  "../src/services/watermark.service",
  () => ({
    updateWatermark: jest.fn(),
  })
);

import { updateWatermark }
from "../src/services/watermark.service";

import {
  updateWatermarkFromUsers,
} from "../src/utils/watermark.util";

describe("Watermark Util", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update watermark using latest timestamp", async () => {

    const users = [
      {
        updatedAt: new Date(
          "2026-05-01"
        ),
      },
      {
        updatedAt: new Date(
          "2026-05-05"
        ),
      },
    ];

    await updateWatermarkFromUsers(
      "consumer-1",
      users
    );

    expect(
      updateWatermark
    ).toHaveBeenCalledTimes(1);

  });

  it("should return when users empty", async () => {

    await updateWatermarkFromUsers(
      "consumer-1",
      []
    );

    expect(
      updateWatermark
    ).not.toHaveBeenCalled();

  });

});