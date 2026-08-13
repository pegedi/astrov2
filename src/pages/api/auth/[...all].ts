import { getAuth } from "../../../lib/auth";
import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const prerender = false;

export const ALL: APIRoute = async (ctx) => {
    const auth = getAuth(env as any, ctx.request);

    let req = ctx.request;
    let isForm = false;

    const contentType = req.headers.get('content-type') || '';
    if (req.method === 'POST' && contentType.includes('application/x-www-form-urlencoded')) {
        isForm = true;
        const formData = await req.formData();
        const body = Object.fromEntries(formData);

        // SERVER-SIDE VALIDATION
        // You can add your custom validation rules here!
        // Example:
        // if (body.password && typeof body.password === 'string' && body.password.length < 8) {
        //     return ctx.redirect('/login?error=Password must be at least 8 characters');
        // }

        const newHeaders = new Headers(req.headers);
        newHeaders.set('content-type', 'application/json');

        console.log(JSON.stringify(body));
        req = new Request(req.url, {
            method: req.method,
            headers: newHeaders,
            body: JSON.stringify(body)
        });
    }

    // Let Better Auth handle the request
    const response = await auth.handler(req);

    // INTERCEPT FORM SUBMISSIONS
    if (isForm) {
        if (response.ok) {
            // Success: Navigate to dashboard
            const headers = new Headers(response.headers);
            headers.set('Location', '/dashboard');
            return new Response(null, { status: 302, headers });
        } else {
            // Error: Redirect back to login/signup with error message
            let errorMessage = "Authentication failed";
            try {
                const errorData = await response.clone().json() as { message?: string };
                if (errorData?.message) errorMessage = errorData.message;
            } catch (e) { }

            const redirectUrl = ctx.url.pathname.includes('sign-up') ? '/signup' : '/login';
            const headers = new Headers(response.headers);
            headers.set('Location', `${redirectUrl}?error=${encodeURIComponent(errorMessage)}`);
            return new Response(null, { status: 302, headers });
        }
    }

    // INTERCEPT SIGN-OUT (if triggered by a non-form request like fetch)
    if (ctx.url.pathname === '/api/auth/sign-out' && ctx.request.method === 'POST' && response.ok) {
        const headers = new Headers(response.headers);
        headers.set('Location', '/login');
        return new Response(null, { status: 302, headers });
    }

    // For everything else, return the normal JSON response
    return response;
};
