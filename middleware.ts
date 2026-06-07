import { NextRequest, NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["en", "sr"];

function getLocale(request: NextRequest) {
  const country = request.geo?.country;

  if (country === "RS" || country === "BA" || country === "ME") {
    return "sr";
  }

  const acceptLanguage = request.headers.get("accept-language") || "";

  if (acceptLanguage.toLowerCase().includes("sr")) {
    return "sr";
  }

  return "en";
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.includes("/api/") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    return;
  }

  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const locale = cookieLocale && locales.includes(cookieLocale)
    ? cookieLocale
    : getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
}