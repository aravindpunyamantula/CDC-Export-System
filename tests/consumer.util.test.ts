import { getConsumerId }
from "../src/utils/consumer.util";

describe("Consumer Util", () => {

  it("should return consumer id", () => {

    const req: any = {
      header: () => "consumer-1",
    };

    expect(
      getConsumerId(req)
    ).toBe("consumer-1");

  });

  it("should throw error when missing", () => {

    const req: any = {
      header: () => undefined,
    };

    expect(() =>
      getConsumerId(req)
    ).toThrow(
      "X-Consumer-ID header is required"
    );

  });

});