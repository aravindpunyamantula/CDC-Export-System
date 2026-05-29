import path from "path";

export function getOutputPath(
  filename: string
) {
  return path.join(
    process.cwd(),
    "output",
    filename
  );
}