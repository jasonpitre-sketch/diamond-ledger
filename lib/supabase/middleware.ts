/**
 * lib/supabase/middleware.ts
 * Supabase session refresh helper for Next.js middleware.
 *
 * Called by middleware.ts (project root) on every request.
 * Responsibilities:
 *   1. Refresh the Supabase session (keeps JWT fresh)
 *   2. Forward updated session cookies to the response
 *
 * This is the only place session refresh happens — Server Components
 * and Route Handlers read the already-refreshed session via
 * lib/supabase/server.ts.
 *
 * IMPORTANT: This does NOT block unauthenticated requests.
 * Route protection logic lives in middleware.ts, not here.
 * This helper only handles session plumbing.
 */

import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        }
      }
    }
  )

  // Refresh session — do NOT remove this call.
  // getUser() triggers the token refresh if the session is stale.
  // Do not use getSession() here — it reads from cache, not the server.
  await supabase.auth.getUser()

  return supabaseResponse
}
