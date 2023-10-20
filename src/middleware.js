import { NextResponse } from 'next/server';

const protectedRoutes = ['/contacts/clients'];

export default function middleware(req) {
  const cookieValue = req.headers.get ? req.headers.get('cookie') : req.headers['cookie'];
  const isAuthenticated = cookieValue.includes('isAuthenticated=true');

  const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.href.includes(route));

  console.log(isAuthenticated, isProtectedRoute);

  if (!isAuthenticated) {
    const absoluteURL = new URL('/authentication/sign-in', req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  } else {
    return NextResponse.next();
  }
}
