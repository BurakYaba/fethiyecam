import sharp from 'sharp'

export interface OptimizedImage {
  buffer: Buffer
  width: number
  height: number
  size: number
}

export async function optimizeImage(
  inputBuffer: Buffer,
  maxWidth: number = 1600, // Reduced from 1920
  quality: number = 85 // Reduced from 90
): Promise<OptimizedImage> {
  const image = sharp(inputBuffer)
  const metadata = await image.metadata()

  let width = metadata.width || maxWidth
  let height = metadata.height

  // Resize if larger than max width
  if (width > maxWidth) {
    const ratio = maxWidth / width
    width = maxWidth
    height = Math.round((height || 0) * ratio)
  }

  // Optimize and convert to WebP
  const optimizedBuffer = await image
    .resize(width, height, {
      fit: 'inside',
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer()

  return {
    buffer: optimizedBuffer,
    width,
    height: height || 0,
    size: optimizedBuffer.length,
  }
}

export async function generateThumbnail(
  inputBuffer: Buffer,
  size: number = 300
): Promise<Buffer> {
  return sharp(inputBuffer)
    .resize(size, size, {
      fit: 'cover',
      position: 'center',
    })
    .webp({ quality: 80 })
    .toBuffer()
}
