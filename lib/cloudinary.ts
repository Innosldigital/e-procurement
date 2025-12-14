// ================================
// lib/cloudinary.ts (FIXED: PDF-safe)
// ================================
import { v2 as cloudinary } from "cloudinary";

const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
const api_key = process.env.CLOUDINARY_API_KEY;
const api_secret = process.env.CLOUDINARY_API_SECRET;

if (cloud_name && api_key && api_secret) {
  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true,
  });
}

// -------------------------------
// Upload BUFFER (handles PDF correctly)
// -------------------------------
export async function uploadBufferToCloudinary(
  buffer: Buffer,
  filename: string,
  folder: string,
  mimeType?: string
) {
  const isPdf = mimeType === "application/pdf" || filename.endsWith(".pdf");

  return new Promise<{
    url: string;
    secure_url: string;
    public_id: string;
    original_filename?: string;
    resource_type?: string;
  }>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: isPdf ? "raw" : "auto",
        filename_override: filename,
        use_filename: true,
        unique_filename: true,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error("Cloudinary upload failed"));
        }

        // FORCE correct URL for PDFs
        const secureUrl = isPdf
          ? result.secure_url.replace("/image/upload/", "/raw/upload/")
          : result.secure_url;

        resolve({
          url: secureUrl,
          secure_url: secureUrl,
          public_id: result.public_id,
          original_filename: (result as any).original_filename,
          resource_type: result.resource_type,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

// -------------------------------
// Upload FILE (Next.js / FormData)
// -------------------------------
export async function uploadFileToCloudinary(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const name = file.name || "upload";

  return uploadBufferToCloudinary(buffer, name, folder, file.type);
}

export default cloudinary;
