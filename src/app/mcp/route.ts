/**
 * Fallback route for `/mcp`.
 *
 * Some MCP clients call `/mcp` directly. Your working handler expects a
 * transport segment (`/mcp/[transport]`), e.g. `/mcp/http`. This route
 * redirects requests from `/mcp` to the common transport `/mcp/http` so
 * clients that call `/mcp` will still reach the MCP handler.
 */
import { NextRequest, NextResponse } from 'next/server';

export function GET(request: NextRequest) {
  const url = new URL('/mcp/http', request.url);
  return NextResponse.redirect(url);
}

export function HEAD(request: NextRequest) {
  const url = new URL('/mcp/http', request.url);
  return NextResponse.redirect(url);
}
