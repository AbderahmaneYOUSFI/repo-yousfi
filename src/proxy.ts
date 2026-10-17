import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";

const publicPaths = new Set(projects.filter(project => project.published).map(project => `/projects/${project.id}`));

// Cache Components streams unknown dynamic params before page-level notFound().
// Reject unknown/unpublished projects before streaming so the HTTP status is 404.
export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, "");
  if (publicPaths.has(pathname)) return NextResponse.next();
  return NextResponse.rewrite(new URL("/404", request.url), { status: 404 });
}

export const config = { matcher: "/projects/:path*" };
