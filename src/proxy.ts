import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const token = request.cookies.get("admin_token")
  const path = request.nextUrl.pathname
  const method = request.method

  const isLoginPage = path === "/admin/login"
  const isAdminPage = path.startsWith("/admin")

  // Protected API routes
  const isProductMutation = path.startsWith("/api/products") && method !== "GET"
  const isOrderView = path.startsWith("/api/orders") && method === "GET"
  const isOrderStatusUpdate = path.startsWith("/api/orders/") && method === "PATCH"
  const isUpload = path === "/api/upload"

  const isProtectedApi = isProductMutation || isOrderView || isOrderStatusUpdate || isUpload

  if ((isAdminPage && !isLoginPage && !token) || (isProtectedApi && !token)) {
    if (isProtectedApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return NextResponse.redirect(new URL("/admin/login", request.url))
  }

  if (isLoginPage && token) {
    return NextResponse.redirect(new URL("/admin", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/products/:path*",
    "/api/orders/:path*",
    "/api/upload"
  ],
}
