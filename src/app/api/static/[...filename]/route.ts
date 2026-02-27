import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { lookup } from "mime-types";

export async function GET(
  req: NextRequest,
  // For Next.js 15+, params is a Promise
  { params }: { params: Promise<{ filename: string[] }> }
) {
  try {
    const { filename } = await params;
    const pathSegments = filename.join("/");

    // Basic security: prevent directory traversal
    const requestedPath = path.join("/data/uploads", pathSegments);
    const resolvedPath = path.resolve(requestedPath);
    const baseDir = path.resolve("/data/uploads");

    if (!resolvedPath.startsWith(baseDir)) {
      return new NextResponse("Forbidden", { status: 403 });
    }

    // Check if file exists
    try {
      await fs.access(resolvedPath);
    } catch {
      return new NextResponse("Not found", { status: 404 });
    }

    const fileBuffer = await fs.readFile(resolvedPath);
    const mimeType = lookup(resolvedPath) || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Static file serving error:", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
