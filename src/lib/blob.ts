import { put, del } from '@vercel/blob'

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

export async function deleteFromBlob(blobId: string, blobUrl?: string): Promise<void> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error('BLOB_READ_WRITE_TOKEN is not set')
  }

  if (!blobId || blobId.trim() === '') {
    console.warn('deleteFromBlob: blobId is empty or null')
    return
  }

  try {
    // Vercel Blob del() can accept either:
    // 1. Full URL (if it starts with http)
    // 2. Pathname (the path part of the URL)
    // The token is automatically read from BLOB_READ_WRITE_TOKEN env var
    const identifier = blobUrl && blobUrl.startsWith('http') ? blobUrl : blobId
    
    console.log(`Attempting to delete blob:`, {
      blobId,
      blobUrl,
      identifier,
    })
    
    // Try with token option (explicit)
    await del(identifier, {
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })
    
    console.log(`Successfully deleted blob: ${identifier}`)
  } catch (error: any) {
    // Log detailed error for debugging
    const errorDetails = {
      message: error?.message,
      code: error?.code,
      statusCode: error?.statusCode,
      blobId,
      blobUrl,
    }
    console.error(`Failed to delete blob:`, errorDetails)
    
    // If it's a 404 (not found), that's okay - blob might already be deleted
    if (error?.statusCode === 404 || error?.code === 'BLOB_NOT_FOUND') {
      console.log('Blob not found (may already be deleted), continuing...')
      return
    }
    
    // Re-throw other errors
    throw error
  }
}
