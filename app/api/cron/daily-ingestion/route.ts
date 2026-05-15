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
import { execFile }     from "child_process"
import { join }         from "path"
import { promisify }    from "util"

const execFileAsync = promisify(execFile)

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

  // ── Determine target date (yesterday ET) ──────────────────────────────────
  // The scheduler resolves this internally, but we log it here for traceability
  const targetDate = yesterdayET()
  console.log(`[CRON] Target date: ${targetDate}`)

  // ── Invoke scheduler ──────────────────────────────────────────────────────
  const schedulerPath = join(process.cwd(), "scripts", "daily-scheduler.mjs")

  try {
    const { stdout, stderr } = await execFileAsync(
      "node",
      [schedulerPath],
      {
        timeout: 55_000,  // Vercel Pro: 60s max. Leave 5s margin.
        maxBuffer: 1024 * 1024 * 2,  // 2MB output buffer
        env: { ...process.env },
      }
    )

    if (stderr) {
      console.warn("[CRON] scheduler stderr:", stderr.slice(0, 500))
    }

    const completedAt = new Date().toISOString()
    console.log(`[CRON] Completed at ${completedAt}`)
    console.log("[CRON] Scheduler output (last 500 chars):", stdout.slice(-500))

    return NextResponse.json({
      ok:          true,
      target_date: targetDate,
      started_at:  startedAt,
      completed_at: completedAt,
      output_preview: stdout.slice(-300),
    })
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err)
    const output = (err as NodeJS.ErrnoException & { stdout?: string })?.stdout ?? ""

    console.error("[CRON] Scheduler failed:", errMsg)
    console.error("[CRON] Output:", output.slice(-500))

    // Return 200 even on scheduler failure — Vercel marks cron as errored on non-200
    // but we want to surface the error in the response body for debugging
    return NextResponse.json({
      ok:          false,
      target_date: targetDate,
      started_at:  startedAt,
      error:       errMsg,
      output_preview: output.slice(-300),
    }, { status: 200 })
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
