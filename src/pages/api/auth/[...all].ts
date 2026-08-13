import { getAuth } from "../../../lib/auth";
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const ALL: APIRoute = async (ctx) => {
    const auth = getAuth(env as any);

    // Let Better Auth handle the request first
    const response = await auth.handler(ctx.request);
    console.log(`pathname ${ctx.url.pathname} ${ctx.request.method}`);
    console.log(response);
    // INTERCEPT SIGN-IN: 
    // If it's a successful sign-in POST request, redirect to dashboard
    if (ctx.url.pathname === '/api/auth/sign-in/email' && ctx.request.method === 'POST' && response.ok) {
        const headers = new Headers(response.headers);
        headers.set('Location', '/dashboard'); // Navigate to dashboard
        return new Response(null, {
            status: 302, // 302 is the HTTP status code for redirect
            headers
        });
    }

    // INTERCEPT SIGN-OUT: 
    // (Optional) You can do the same for sign-out to redirect back to login!
    if (ctx.url.pathname === '/api/auth/sign-out' && ctx.request.method === 'POST' && response.ok) {
        const headers = new Headers(response.headers);
        headers.set('Location', '/login');
        return new Response(null, {
            status: 302,
            headers
        });
    }

    // For everything else, return the normal JSON response
    return response;
};
