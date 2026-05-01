/* eslint-disable @typescript-eslint/no-explicit-any */

import { scoreKnowledgeBioAnalyst } from "./bioRules"


/* =========================
TEXT NORMALIZER
========================= */

function normalizeText(val:any){

if(val === undefined || val === null)
return 0.82

if(typeof val === "number")
return val

const v = String(val).toLowerCase()

if(
v.includes("elite") ||
v.includes("plus")
) return 0.94

if(v.includes("strong"))
return 0.88

if(v.includes("average"))
return 0.75

if(
v.includes("risk") ||
v.includes("volatile")
) return 0.62

return 0.82

}



/* =========================
BIO ANALYST
MAX = 3
========================= */

export function calculateKnowledgeBioAnalyst(k:any){

return Number((scoreKnowledgeBioAnalyst(k?.bio).score * 3).toFixed(3))

}



/* =========================
BIO ANALYST ROW VALUES
returns individual DLR contributions
each contributes toward /3
========================= */

export function calculateKnowledgeBioAnalystRows(k:any){

const a = k?.bio?.analyst

if(!a){

return{

serviceTime:0,
options:0,
injuryIdx:0,
pedigree:0,
devCurve:0,
orgValue:0,
assetRisk:0,
longValue:0

}

}

/* normalize values */

const vals={

serviceTime: normalizeText(a.serviceTime),

options: normalizeText(a.options),

injuryIdx: normalizeText(a.injuryIdx),

pedigree: normalizeText(a.pedigree),

devCurve: normalizeText(a.devCurve),

orgValue: normalizeText(a.orgValue),

assetRisk: normalizeText(a.assetRisk),

longValue: normalizeText(a.longValue)

}

/* scale each signal to portion of /3 */

const scale = 3/8

return{

serviceTime: Number((vals.serviceTime * scale).toFixed(2)),

options: Number((vals.options * scale).toFixed(2)),

injuryIdx: Number((vals.injuryIdx * scale).toFixed(2)),

pedigree: Number((vals.pedigree * scale).toFixed(2)),

devCurve: Number((vals.devCurve * scale).toFixed(2)),

orgValue: Number((vals.orgValue * scale).toFixed(2)),

assetRisk: Number((vals.assetRisk * scale).toFixed(2)),

longValue: Number((vals.longValue * scale).toFixed(2))

}

}



/* =========================
SCOUT ANALYST
MAX = 3
========================= */

export function calculateKnowledgeScoutAnalyst(k:any){

const a = k?.scout?.analyst

if(!a) return 0

let score = 0

score += normalizeText(a.ceiling)
score += normalizeText(a.floor)
score += normalizeText(a.roleProb)
score += normalizeText(a.eta)
score += normalizeText(a.volatility)
score += normalizeText(a.comparable)
score += normalizeText(a.orgFit)
score += normalizeText(a.riskTrend)

return Number((score / 8 * 3).toFixed(2))

}



/* =========================
CAREER ANALYST
MAX = 3
========================= */

export function calculateKnowledgeCareerAnalyst(k:any){

const a = k?.career?.analyst

if(!a) return 0

let score = 0

score += normalizeText(a.amateurCeiling)
score += normalizeText(a.draftValue)
score += normalizeText(a.ascentSpeed)
score += normalizeText(a.setbacks)
score += normalizeText(a.recoveryTrack)
score += normalizeText(a.orgPatience)
score += normalizeText(a.careerArc)
score += normalizeText(a.longView)

return Number((score / 8 * 3).toFixed(2))

}
