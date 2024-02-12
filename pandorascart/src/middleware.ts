// middleware/auth.js

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  const { data: { session } } = await supabase.auth.getSession();

  // Check if the requested path is '/account', '/login', or '/signup'
  const isAccountPath = req.nextUrl.pathname === '/account';
  const isLoginPath = req.nextUrl.pathname === '/login';
  const isSignupPath = req.nextUrl.pathname === '/signup';
  const isConfirmPath = req.nextUrl.pathname === '/confirmation';
  const isCheckoutPath = req.nextUrl.pathname === '/checkout';

  // Check auth condition
  if (session) {
    // If the user is authenticated, restrict access to login and sign-up pages.
    if (isLoginPath || isSignupPath || isConfirmPath) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/';
      redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // If the user is authenticated but not accessing login, sign-up, or account pages, allow access.
    return res;
  } else {
    // If the user is not authenticated, allow access to login and sign-up pages.
    if (isLoginPath || isSignupPath || isConfirmPath) {
      return res;
    }

    // If the user is not authenticated and trying to access other protected paths, redirect to home.
    if (isAccountPath) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/';
      redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    if (isCheckoutPath) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = '/signup';
      redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Auth condition not met for other paths, allow access.
  return res;
}

export const config = {
  // Update the matcher to include the '/account', '/login', and '/signup' paths.
  matcher: ['/middleware-protected/:path*', '/account', '/login', '/signup', '/confirmation', '/checkout'],
};
