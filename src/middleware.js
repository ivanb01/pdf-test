import { NextResponse } from 'next/server';

export function middleware(req) {
  const cookieValue = req.headers.get ? req.headers.get('cookie') : req.headers['cookie'];
  const isAuthenticated = cookieValue.includes('isAuthenticated=true');

  // const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.href.includes(route));

  if (req.nextUrl.pathname.includes('/pages')) {
    console.log(req.nextUrl.pathname);
    if (
      !req.nextUrl.pathName.includes('_app') &&
      !isAuthenticated &&
      req.nextUrl.pathname !== '/authentication/sign-in'
    ) {
      const absoluteURL = new URL('/authentication/sign-in', req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/:path*',
};
