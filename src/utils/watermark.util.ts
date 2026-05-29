import {updateWatermark} from "../services/watermark.service";
export async function updateWatermarkFromUsers(
  consumerId: string,
  users: { updatedAt: Date }[]
) {
  if (users.length === 0) {
    return;
  }

  const latestTimestamp =
    users[users.length - 1].updatedAt;

  await updateWatermark(
    consumerId,
    latestTimestamp
  );
}