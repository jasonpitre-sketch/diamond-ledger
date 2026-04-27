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
    const values = [
      integer(statNumber(snapshot,"g")),
      fixed(statNumber(snapshot,"ip"),1),
      statString(snapshot,"wL") ?? "-",
      integer(statNumber(snapshot,"so")),
      fixed(statNumber(snapshot,"soBb"),2),
      fixed(statNumber(snapshot,"whip") ?? statNumber(player.pitching,"WHIP"),2),
      fixed(statNumber(snapshot,"era") ?? statNumber(player.pitching,"ERA"),2)
    ]

    return {
      kind:"pitcher",
      headers:["YR","G","IP","W-L","SO","SO/BB","WHIP","ERA"],
      rows:[
        { label:year, values },
        { label:"TOTAL", values }
      ]
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
