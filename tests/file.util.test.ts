import {
  getOutputPath
} from "../src/utils/file.util";

describe("File Util", () => {

  it("should build output path", () => {

    const path =
      getOutputPath("test.csv");

    expect(path)
      .toContain("output");

    expect(path)
      .toContain("test.csv");

  });

});