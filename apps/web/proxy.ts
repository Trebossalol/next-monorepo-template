import { betterFetch } from "@better-fetch/fetch";
import { type NextRequest, NextResponse } from "next/server";
import { routes } from "@workspace/common/routes";
import { Session } from "@workspace/auth/lib/index";
import { env } from "@workspace/common/env";

async function getSession(req: NextRequest): Promise<Session | null> {
	try {
		const { data: session, error } = await betterFetch<Session>(
			"/api/auth/get-session?disableCookieCache=true",
			{
				baseURL: req.nextUrl.origin,
				headers: {
					cookie: req.headers.get("cookie") || "",
				},
			},
		);

		if (error) {
			if (process.env.NODE_ENV === "development") {
				console.error("Session fetch failed:", error);
			}
			return null;
		}

		return session;
	} catch (error) {
		if (process.env.NODE_ENV === "development") {
			console.error("Error getting session:", error);
		}
		return null;
	}
}

function getCorsHeaders(request: Request): Record<string, string> {
	const origin = request.headers.get("origin") || "*";

	const isAllowed =
		origin === "*" ||
		env.ALLOWED_ORIGINS.some((allowedOrigin) => allowedOrigin === origin);

	if (isAllowed) {
		const headers: Record<string, string> = {
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
			"Access-Control-Max-Age": "86400",
			"Access-Control-Allow-Origin": origin,
		};

		if (origin !== "*") {
			headers["Access-Control-Allow-Credentials"] = "true";
		}

		return headers;
	}

	if (process.env.NODE_ENV === "development") {
		console.warn("CORS origin not allowed", { origin });
	}

	return {};
}

function isProtectedPath(pathname: string): boolean {
	return pathname.startsWith("/app");
}

export default async function proxy(req: NextRequest) {
	const { pathname } = req.nextUrl;

	// CWE-204: Block TRACE and TRACK methods to prevent proxy/server fingerprinting
	if (req.method === "TRACE" || req.method === "TRACK") {
		return new NextResponse(null, {
			status: 405,
			headers: {
				Allow: "GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS",
				"Content-Type": "text/plain",
			},
		});
	}

	// Handle CORS for API routes
	if (pathname.startsWith("/api")) {
		const corsHeaders = getCorsHeaders(req);
		if (req.method === "OPTIONS") {
			return new NextResponse(null, {
				status: 200,
				headers: corsHeaders,
			});
		}
		const response = NextResponse.next();
		for (const [key, value] of Object.entries(corsHeaders)) {
			response.headers.set(key, value);
		}
		return response;
	}

	// Protected routes that require authentication
	if (isProtectedPath(pathname)) {
		const session = await getSession(req);

		if (!session) {
			return NextResponse.redirect(routes.web.auth.SignIn);
		}

		return NextResponse.next();
	}

	// Handle auth routes - redirect logged-in users away
	if (pathname.startsWith("/auth")) {
		const session = await getSession(req);

		if (session) {
			return NextResponse.redirect(routes.web.app.Index);
		}
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image).*)"],
};
