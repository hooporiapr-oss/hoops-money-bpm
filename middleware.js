import { NextResponse } from 'next/server';

export function middleware(request) {
  const url = request.nextUrl.clone();
  url.pathname = '/player.html';
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/player/:slug*'],
};
