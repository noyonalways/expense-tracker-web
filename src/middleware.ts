import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// Add the paths that need authentication
const protectedPaths = ["/expenses", "/set-limit", "/profile"];

// Add the public paths that should redirect to /expenses if authenticated
const publicPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token");
  const { pathname } = request.nextUrl;

  // Check if the path is protected and user is not authenticated
  if (protectedPaths.includes(pathname) && !token) {
    const loginUrl = new URL("/login", request.url);
    // Add the original URL as a redirect parameter
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check if user is already authenticated and trying to access login/register
  if (publicPaths.includes(pathname) && token) {
    const expensesUrl = new URL("/expenses", request.url);
    return NextResponse.redirect(expensesUrl);
  }

  return NextResponse.next();
}

// Configure the paths that trigger the middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
