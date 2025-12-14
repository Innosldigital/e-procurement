import { NextRequest } from "next/server";
import cloudinary, { uploadFileToCloudinary } from "@/lib/cloudinary";

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
      public_id?: string;
      resource_type?: string;
    }> = [];

    for (const file of files) {
      if (!file || !file.size) continue;

      const upload = await uploadFileToCloudinary(file, folder);

      results.push({
        name: file.name || upload.original_filename || "file",
        size: file.size,
        type: file.type || "application/octet-stream",
        url: upload.secure_url,
        public_id: upload.public_id,
        resource_type: upload.resource_type,
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

export async function GET(req: NextRequest) {
  try {
    const urlParam = req.nextUrl.searchParams.get("url");
    const publicId = req.nextUrl.searchParams.get("public_id");
    const filename = req.nextUrl.searchParams.get("filename") || "document.pdf";

    let fileUrl = urlParam || "";
    if (!fileUrl && publicId) {
      fileUrl = cloudinary.url(publicId, {
        resource_type: "raw",
        secure: true,
        format: "pdf",
      });
    }
    if (!fileUrl) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing url or public_id" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    if (!fileUrl.startsWith("https://res.cloudinary.com/")) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid Cloudinary URL" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const upstream = await fetch(fileUrl);
    if (!upstream.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Fetch failed (${upstream.status})`,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    const buf = await upstream.arrayBuffer();
    const contentType =
      upstream.headers.get("Content-Type") ||
      (fileUrl.endsWith(".pdf")
        ? "application/pdf"
        : "application/octet-stream");

    return new Response(buf, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${filename}"`,
        "Cache-Control": "private, max-age=60",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error?.message || "Fetch failed",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
