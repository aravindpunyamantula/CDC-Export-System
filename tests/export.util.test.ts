import {
  createJobMetadata
} from "../src/utils/export.util";

describe("Export Util", () => {

  it("should generate metadata", () => {

    const result =
      createJobMetadata(
        "consumer-1",
        "full"
      );

    expect(
      result.jobId
    ).toBeDefined();

    expect(
      result.outputFileName
    ).toContain("full");

    expect(
      result.outputFileName
    ).toContain("consumer-1");

  });

});