import { type NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

export const middleware = async (request: NextRequest) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
};

export const config = {
  runtime: "nodejs",
  matcher: ["/((?!api|_next/static|_next/image|sign-in|.*\\.png$).*)"],
};
