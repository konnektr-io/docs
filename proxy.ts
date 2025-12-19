import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Only handle root path redirects
  if (url.pathname === '/') {
    if (hostname.startsWith('docs.')) {
      url.pathname = '/docs';
      return NextResponse.redirect(url);
    }
    
    if (hostname.startsWith('blog.')) {
      url.pathname = '/blog';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
