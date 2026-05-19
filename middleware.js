import { authRealm, hasAuthConfig, validateBasicAuth } from "./auth.js";

export const config = {
  matcher: ["/((?!api/health).*)"]
};

export default function middleware(request) {
  if (!hasAuthConfig()) {
    return Response.next();
  }

  const isAuthorized = validateBasicAuth(request.headers.get("authorization"));
  if (isAuthorized) {
    return Response.next();
  }

  return new Response("Autenticacao necessaria.", {
    status: 401,
    headers: {
      "WWW-Authenticate": `Basic realm="${authRealm}", charset="UTF-8"`
    }
  });
}
