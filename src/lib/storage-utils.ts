export function extractPath(url: string, bucketName: string): string | null {
  const parts = url.split(`/${bucketName}/`);
  return parts.length > 1 ? parts[1] : null;
}
