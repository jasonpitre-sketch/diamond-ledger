/**
 * lib/supabase/server.ts
 * Server-side Supabase client — use in Server Components, Route Handlers,
 * and Server Actions only. Reads/writes cookies via Next.js headers API.
 *
 * Usage (Server Component or Route Handler):
 *   import { createServerClient } from "@/lib/supabase/server"
 *   const supabase = await createServerClient()
 *
 * The returned client has the authenticated user's session baked in via
 * cookies, so auth.getUser() returns the real server-side user.
 *
 * NOTE: This must only be called in a server context where cookies() is
 * available (App Router only). Do NOT import in Client Components.
 */

import { createServerClient as _createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createServerClient() {
  const cookieStore = await cookies()

  return _createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {
            // setAll called from a Server Component — cookies are read-only.
            // Session refresh is handled by the middleware instead.
          }
        }
      }
    }
  )
}
