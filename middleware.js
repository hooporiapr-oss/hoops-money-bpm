import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const knownPaths = [
    '/',
    '/index.html',
    '/join.html',
    '/login.html',
    '/my-profile.html',
    '/discover.html',
    '/player.html',
    '/privacy.html',
    '/terms.html',
  ];

  // Pass through known pages, API routes, static files, Next internals
  if (
    knownPaths.includes(pathname) ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/favicon') ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|css|js|webp|woff|woff2|ttf|json)$/)
  ) {
    return NextResponse.next();
  }

  // /player/slug → rewrite to player.html
  if (pathname.startsWith('/player/')) {
    const url = request.nextUrl.clone();
    url.pathname = '/player.html';
    return NextResponse.rewrite(url);
  }

  // Default — 404
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
};
