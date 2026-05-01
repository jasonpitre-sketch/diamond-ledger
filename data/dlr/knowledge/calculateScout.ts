/* eslint-disable @typescript-eslint/no-explicit-any */

import {
knowledgeScoutSnapshotRules
} from "./dlr_rules_knowledge"
import { scoreKnowledgeBioScout } from "./bioRules"



/* =====================================================
BIO → SCOUT LAYER
3 signals contribute
max contribution = 2 pts
===================================================== */

export function calculateKnowledgeBioScout(k:any){

return Number((scoreKnowledgeBioScout(k?.bio).score * 2).toFixed(3))

}



/* =====================================================
SCOUT → SCOUT LAYER
3 signals contribute
max contribution = 2 pts
===================================================== */

export function calculateKnowledgeScoutScout(k:any){

if(!k?.scout?.scout) return 0

const s = k.scout.scout



/* determine best pitch safely */

const bestPitch =
Math.max(
s?.fastball ?? 50,
s?.slider ?? 50,
s?.splitter ?? 50
)



/* convert 20-80 scale to normalized score */

function normalizeFV(fv:number){

if(fv>=70) return 1
if(fv>=65) return .98
if(fv>=60) return .96
if(fv>=55) return .92
if(fv>=50) return .88
if(fv>=45) return .84

return .8

}



let score = 0

score += normalizeFV(bestPitch)
score += normalizeFV(s?.command ?? 50)
score += normalizeFV(s?.overallFV ?? 50)



return Number(((score / 3) * 2).toFixed(3))

}



/* =====================================================
CAREER → SCOUT LAYER
3 signals contribute
max contribution = 2 pts
===================================================== */

export function calculateKnowledgeCareerScout(k:any){

if(!k?.career?.scout) return 0

const s = k.career.scout



/**********************
string normalizer
**********************/

function normalizeTier(val?:string){

if(!val) return .85

const v = val.toLowerCase()



if(v.includes("elite")) return 1

if(v.includes("premium")) return .97

if(v.includes("high")) return .95

if(v.includes("strong")) return .93

if(v.includes("rapid")) return .96

if(v.includes("quick")) return .95

if(v.includes("stable")) return .92

return .88

}



let score = 0

score += normalizeTier(s?.draftPedigree)
score += normalizeTier(s?.projectionPath)
score += normalizeTier(s?.orgCommitment)



return Number(((score / 3) * 2).toFixed(3))

}
