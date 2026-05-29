import { Request } from "express";

export function getConsumerId(
  req: Request
): string {

  const consumerId =
    req.header("X-Consumer-ID");

  if (!consumerId) {
    throw new Error(
      "X-Consumer-ID header is required"
    );
  }

  return consumerId;
}