export type SignalTone = "hot" | "cold" | "neutral"
export type SignalDirection = "up" | "down" | "flat"
export type StatRecord = Record<string, number | string | null | undefined>

export type SignalPlayer = {
  name?: string
  draftYear?: number
  tier?: string
  hitting?: StatRecord | null
  pitching?: StatRecord | null
  performance?: {
    kind?: string
    snapshot?: StatRecord
    scout?: StatRecord
    analyst?: StatRecord
  }
  media?: {
    snapshot?: StatRecord
    analyst?: StatRecord
  }
}

export type CalculatedSignals = {
  form: SignalTone
  surge: SignalTone
  value: SignalDirection
  formReason: string
  surgeReason: string
  valueReason: string
}

export type StatTable = {
  kind: "hitter" | "pitcher"
  headers: string[]
  rows: Array<{
    label: string
    values: string[]
  }>
}

export function statNumber(source: StatRecord | null | undefined,key:string){
  const value = source?.[key]
  if (typeof value === "string" && value.trim() && !Number.isNaN(Number(value))) return Number(value)
  return typeof value === "number" && Number.isFinite(value) ? value : null
}

function statString(source: StatRecord | null | undefined,key:string){
  const value = source?.[key]
  return typeof value === "string" && value.trim() ? value : null
}

export function toneScore(tone:SignalTone){
  if(tone==="hot") return 2
  if(tone==="cold") return 0
  return 1
}

export function directionScore(direction:SignalDirection){
  if(direction==="up") return 2
  if(direction==="down") return 0
  return 1
}

export function mediaPulse(p:SignalPlayer | null | undefined){
  const player = p ?? {}
  const snapshot = player.media?.snapshot
  const analyst = player.media?.analyst

  const values = [
    statNumber(snapshot,"mentions"),
    statNumber(snapshot,"headlineImpact"),
    statNumber(snapshot,"highlightFactor"),
    statNumber(snapshot,"socialBuzz"),
    statNumber(analyst,"publicMomentum"),
    statNumber(analyst,"hypeTrend")
  ].filter((v): v is number => typeof v === "number")

  if(values.length===0) return .5

  return values.reduce((sum,value)=>sum+value,0) / values.length
}

function fixed(value:number | null,digits:number){
  return value === null ? "-" : value.toFixed(digits)
}

function average(value:number | null){
  if(value === null) return "-"
  return value.toFixed(3).replace(/^0/,"")
}

function integer(value:number | null){
  return value === null ? "-" : String(Math.round(value))
}

function formatWinLoss(w:number | null,l:number | null){
  if(w === null && l === null) return "-"
  return `${Math.round(w ?? 0)}-${Math.round(l ?? 0)}`
}

function isPitcher(p:SignalPlayer,viewMode:"hit"|"pitch"){
  return viewMode === "pitch" || p.performance?.kind === "pitcher"
}

export function calculatePlayerSignals(p:SignalPlayer | null | undefined,viewMode:"hit"|"pitch"): CalculatedSignals {
  const player = p ?? {}
  const snapshot = player.performance?.snapshot
  const media = mediaPulse(player)

  if(isPitcher(player,viewMode)){
    const era = statNumber(player.pitching,"ERA") ?? statNumber(snapshot,"era")
    const whip = statNumber(player.pitching,"WHIP") ?? statNumber(snapshot,"whip")
    const strikeouts = statNumber(player.pitching,"K") ?? statNumber(snapshot,"so")
    const innings = statNumber(player.pitching,"IP") ?? statNumber(snapshot,"ip")
    const soBb = statNumber(snapshot,"soBb")
    const kPerIp = strikeouts !== null && innings ? strikeouts / innings : null

    const form:SignalTone =
      soBb !== null && soBb >= 3.0 ? "hot" :
      kPerIp !== null && kPerIp >= .9 ? "hot" :
      soBb !== null && soBb < 1.8 ? "cold" :
      "neutral"

    const surge:SignalTone =
      era !== null && whip !== null && era <= 3.75 && whip <= 1.25 ? "hot" :
      era !== null && era >= 5 ? "cold" :
      whip !== null && whip >= 1.45 ? "cold" :
      "neutral"

    const value:SignalDirection =
      (form==="hot" || surge==="hot") && media < .58 ? "up" :
      (form==="cold" || surge==="cold") && media > .65 ? "down" :
      "flat"

    return {
      form,
      surge,
      value,
      formReason: soBb !== null
        ? `SO/BB ${soBb.toFixed(2)} is ${form==="hot" ? "above" : form==="cold" ? "below" : "near"} the command trigger.`
        : kPerIp !== null
          ? `K/IP ${kPerIp.toFixed(2)} is driving the command read.`
          : "Command signal needs more strikeout and walk data.",
      surgeReason: era !== null && whip !== null
        ? `ERA ${era.toFixed(2)} and WHIP ${whip.toFixed(2)} set the run-control read.`
        : "Run-control signal needs ERA and WHIP data.",
      valueReason: value==="up"
        ? `Performance signal is ahead of media pulse ${media.toFixed(2)}.`
        : value==="down"
          ? `Attention is elevated while performance signal is cooling.`
          : `Performance and attention are currently aligned.`
    }
  }

  const avg = statNumber(player.hitting,"AVG") ?? statNumber(snapshot,"avg")
  const hits = statNumber(player.hitting,"H")
  const atBats = statNumber(snapshot,"ab")
  const hitRate = hits !== null && atBats ? hits / atBats : avg
  const homeRuns = statNumber(player.hitting,"HR") ?? statNumber(snapshot,"hr")
  const slugging = statNumber(snapshot,"slg")
  const ops = statNumber(player.hitting,"OPS") ?? statNumber(snapshot,"ops")
  const hrRate = homeRuns !== null && atBats ? homeRuns / atBats : null

  const form:SignalTone =
    hitRate !== null && hitRate >= .300 ? "hot" :
    avg !== null && avg >= .300 ? "hot" :
    hitRate !== null && hitRate < .240 ? "cold" :
    avg !== null && avg < .240 ? "cold" :
    "neutral"

  const surge:SignalTone =
    hrRate !== null && hrRate >= .04 ? "hot" :
    slugging !== null && slugging >= .520 ? "hot" :
    ops !== null && ops >= .850 ? "hot" :
    hrRate !== null && hrRate < .015 && ops !== null && ops < .680 ? "cold" :
    "neutral"

  const value:SignalDirection =
    (form==="hot" || surge==="hot") && media < .66 ? "up" :
    (form==="cold" || surge==="cold") && media > .7 ? "down" :
    "flat"

  return {
    form,
    surge,
    value,
    formReason: hitRate !== null
      ? `H/AB ${hitRate.toFixed(3)} is ${form==="hot" ? "above" : form==="cold" ? "below" : "near"} the bat-heat trigger.`
      : "Bat heat needs AVG or H/AB data.",
    surgeReason: hrRate !== null
      ? `HR/AB ${(hrRate * 100).toFixed(1)}% is ${surge==="hot" ? "inside" : surge==="cold" ? "below" : "near"} the power trigger.`
      : ops !== null
        ? `OPS ${ops.toFixed(3)} is driving the power read.`
        : "Power signal needs HR/AB, SLG, or OPS data.",
    valueReason: value==="up"
      ? `Performance signal is ahead of media pulse ${media.toFixed(2)}.`
      : value==="down"
        ? `Attention is elevated while performance signal is cooling.`
        : `Performance and attention are currently aligned.`
  }
}

export function getPerformanceStatTable(p:SignalPlayer | null | undefined): StatTable {
  const player = p ?? {}
  const snapshot = player.performance?.snapshot
  const pitcher = player.performance?.kind === "pitcher" || Boolean(player.pitching)
  const year = statString(snapshot,"year") ?? "2025"

  if(pitcher){
    const performance = player.performance as
      | {
        careerLine?: StatRecord
        season2026?: StatRecord
        season2025?: StatRecord
        season2024?: StatRecord
      }
      | undefined
    const tracker = (player as { tracker?: { rolling?: Record<string, StatRecord | null | undefined> } }).tracker
    const season = performance?.season2026 ?? snapshot
    const careerLine = performance?.careerLine
    const pitcherRow = (source: StatRecord | null | undefined) => [
      integer(statNumber(source,"g") ?? statNumber(source,"G") ?? statNumber(source,"games")),
      fixed(statNumber(source,"ip") ?? statNumber(source,"IP"),1),
      integer(statNumber(source,"w") ?? statNumber(source,"W")),
      integer(statNumber(source,"l") ?? statNumber(source,"L")),
      integer(statNumber(source,"h") ?? statNumber(source,"H")),
      integer(statNumber(source,"so") ?? statNumber(source,"SO") ?? statNumber(source,"k") ?? statNumber(source,"K")),
      fixed(statNumber(source,"era") ?? statNumber(source,"ERA"),2),
      fixed(statNumber(source,"whip") ?? statNumber(source,"WHIP"),2)
    ]
    const rows = [
      { label:"7D", values: pitcherRow(tracker?.rolling?.days7) },
      { label:"15D", values: pitcherRow(tracker?.rolling?.days15) },
      { label:"30D", values: pitcherRow(tracker?.rolling?.days30) },
      { label:year, values: pitcherRow(season) }
    ]

    if (performance?.season2025) rows.push({ label:"2025", values: pitcherRow(performance.season2025) })
    if (careerLine) rows.push({ label:"TOTAL", values: pitcherRow(careerLine) })

    return {
      kind:"pitcher",
      headers:["","G","IP","W","L","H","SO","ERA","WHIP"],
      rows
    }
  }

  const values = [
    integer(statNumber(snapshot,"g")),
    integer(statNumber(snapshot,"ab")),
    integer(statNumber(snapshot,"hr") ?? statNumber(player.hitting,"HR")),
    integer(statNumber(snapshot,"rbi") ?? statNumber(player.hitting,"RBI")),
    average(statNumber(snapshot,"slg")),
    average(statNumber(snapshot,"avg") ?? statNumber(player.hitting,"AVG")),
    average(statNumber(snapshot,"ops") ?? statNumber(player.hitting,"OPS"))
  ]

  return {
    kind:"hitter",
    headers:["YR","G","AB","HR","RBI","SLG","AVG","OPS"],
    rows:[
      { label:year, values },
      { label:player.tier === "DRAFT" ? "TOTAL" : "TOTAL", values }
    ]
  }
}
