import { NextRequest } from 'next/server'
import { uploadFileToCloudinary } from '@/lib/cloudinary'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const files = formData.getAll('files') as File[]
    const folder = (formData.get('folder') as string) || 'uploads'
    const results: Array<{ name: string; size: number; type: string; url: string }> = []
    for (const f of files) {
      if (!f || !f.size) continue
      const up = await uploadFileToCloudinary(f, folder)
      results.push({
        name: (f as any).name || up.original_filename || 'file',
        size: (f as any).size || 0,
        type: (f as any).type || 'application/octet-stream',
        url: up.secure_url || up.url,
      })
    }
    return new Response(JSON.stringify({ success: true, data: results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e: any) {
    return new Response(JSON.stringify({ success: false, error: e?.message || 'Upload failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
