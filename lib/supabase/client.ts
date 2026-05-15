/**
 * lib/supabase/client.ts
 * Browser-side Supabase client — use in Client Components only.
 *
 * Usage:
 *   import { createClient } from "@/lib/supabase/client"
 *   const supabase = createClient()
 *
 * Creates a new client per call using @supabase/ssr's createBrowserClient.
 * Safe to call in any Client Component render cycle.
 */

import { createBrowserClient } from "@supabase/ssr"

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
