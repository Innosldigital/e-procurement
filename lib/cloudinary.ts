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

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  filename: string,
  folder: string
) {
  return new Promise<{
    url: string;
    public_id: string;
    secure_url: string;
    original_filename?: string;
  }>((resolve, reject) => {
    const upload_stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
        filename_override: filename,
        use_filename: true,
      },
      (error, result) => {
        if (error || !result)
          return reject(error || new Error("Cloudinary upload failed"));
        resolve({
          url: result.url,
          secure_url: result.secure_url,
          public_id: result.public_id,
          original_filename: (result as any).original_filename,
        });
      }
    );
    upload_stream.end(buffer);
  });
}

export async function uploadFileToCloudinary(file: File, folder: string) {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const name = (file as any).name || "upload";
  return uploadBufferToCloudinary(buffer, name, folder);
}

export default cloudinary;
