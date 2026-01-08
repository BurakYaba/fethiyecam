import { put } from '@vercel/blob'

export async function uploadToBlob(
  filename: string,
  buffer: Buffer,
  contentType: string
): Promise<{ url: string; blobId: string }> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not set')
  }

  const blob = await put(filename, buffer as any, {
    access: 'public',
    contentType,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })

  return {
    url: blob.url,
    blobId: blob.pathname,
  }
}
