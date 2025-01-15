import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { NextMiddlewareResult } from "next/dist/server/web/types";
import i18nMiddleware from "./utils/i18nMiddleware";

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

const withI18n: MiddlewareFactory = (next: CustomMiddleware) => {
  return (request: NextRequest, event: NextFetchEvent, response: NextResponse) => {
    const pathname = request.nextUrl.pathname;
    if (/^\/(?!api|sockjs\/|_next\/static|_next\/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp|js))/.test(pathname)) {
      return next(request, event, i18nMiddleware(request, response));
    }
    return next(request, event, response);
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

export default chain([withCreateResponse, withI18n]);