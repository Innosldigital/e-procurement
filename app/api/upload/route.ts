import { NextRequest } from "next/server";
import { uploadFileToCloudinary } from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("files") as File[];
    const folder = (formData.get("folder") as string) || "uploads";

    const results: Array<{
      name: string;
      size: number;
      type: string;
      url: string;
    }> = [];

    for (const file of files) {
      if (!file || !file.size) continue;

      const upload = await uploadFileToCloudinary(file, folder);

      results.push({
        name: file.name || upload.original_filename || "file",
        size: file.size,
        type: file.type || "application/octet-stream",
        url: upload.secure_url, // ✅ already fixed for PDFs
      });
    }

    return new Response(JSON.stringify({ success: true, data: results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || "Upload failed",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
