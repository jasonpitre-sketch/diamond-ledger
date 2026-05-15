/**
 * VERCEL CRON HANDLER — Daily Ingestion
 * ═══════════════════════════════════════════════════════════════════════════
 * Triggered at 11:00 UTC (6 AM ET winter / 7 AM ET summer) by Vercel Cron.
 * Protected by CRON_SECRET header — unauthorized requests return 401.
 *
 * Invokes the daily scheduler as a child process to maintain clean separation
 * between the Next.js app layer and the Node.js ingestion scripts layer.
 *
 * See: vercel.json (cron schedule)
 *      scripts/daily-scheduler.mjs (orchestrator)
 *      data/dlr/MLB_AUTOMATION_RULES.md (governance)
 */

import { NextResponse } from "next/server"
import { runScheduler } from "../../../../scripts/daily-scheduler.mjs"

// Required: Vercel Cron sets Authorization: Bearer {CRON_SECRET}
const CRON_SECRET = process.env.CRON_SECRET ?? ""

export async function GET(request: Request): Promise<NextResponse> {
  // ── Auth gate ─────────────────────────────────────────────────────────────
  const authHeader = request.headers.get("authorization") ?? ""
  if (!CRON_SECRET || authHeader !== `Bearer ${CRON_SECRET}`) {
    console.error("[CRON] Unauthorized request — missing or invalid CRON_SECRET")
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const startedAt = new Date().toISOString()
  console.log(`[CRON] Daily ingestion triggered at ${startedAt}`)

  // ── Determine target date (yesterday ET unless manually supplied) ─────────
  const requestUrl = new URL(request.url)
  const targetDate = requestUrl.searchParams.get("date") ?? yesterdayET()
  console.log(`[CRON] Target date: ${targetDate}`)

  // ── Invoke scheduler ──────────────────────────────────────────────────────
  try {
    const result = await runScheduler({ targetDate } as never)

    const completedAt = new Date().toISOString()
    console.log(`[CRON] Completed at ${completedAt}`)
    console.log("[CRON] Scheduler counts:", result.counts)

    return NextResponse.json({
      ok:          result.counts.error === 0,
      target_date: targetDate,
      started_at:  startedAt,
      completed_at: completedAt,
      counts:      result.counts,
      results:     result.results,
    }, { status: result.counts.error === 0 ? 200 : 500 })
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)

    console.error("[CRON] Scheduler failed:", errMsg)

    return NextResponse.json({
      ok:          false,
      target_date: targetDate,
      started_at:  startedAt,
      error:       errMsg,
    }, { status: 500 })
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DATE UTILITY — mirrors scheduler
// ─────────────────────────────────────────────────────────────────────────────

function yesterdayET(): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric", month: "2-digit", day: "2-digit",
  })
  const today = formatter.format(new Date())
  const d = new Date(today + "T12:00:00Z")
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}
