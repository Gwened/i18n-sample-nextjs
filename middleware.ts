import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";

// See also https://www.58bits.com/blog/chaining-or-combining-nextjs-middleware

export type CustomMiddleware = (
  request: NextRequest,
  event: NextFetchEvent,
  response: NextResponse
) => NextMiddlewareResult | Promise<NextMiddlewareResult>

type MiddlewareFactory = (middleware: CustomMiddleware) => CustomMiddleware;

function chain(functions: MiddlewareFactory[] = [], index = 0): CustomMiddleware {
  const current = functions[index];
  if (current) {
    const next = chain(functions, index + 1);
    return current(next);
  }
  return (request: NextRequest, event: NextFetchEvent, response: NextResponse) => response;
}

const withCreateResponse: MiddlewareFactory = (next: CustomMiddleware) => {
  return (request: NextRequest, event: NextFetchEvent, _response: NextResponse) => {
    return next(request, event, NextResponse.next({
      request: {
        headers: request.headers,
      },
    }));
  }
}

function concatHeader(a: string|null, b: string) {
  if (a === "" || a === null) return b;
  if (b === "" || b === null) return a;
  return a + ", " + b;
}

export function addToHeader(response: NextResponse, key: string, value: string) {
  response.headers.set(key, concatHeader(response.headers.get(key), value));
}

export default chain([withCreateResponse]);