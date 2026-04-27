/* eslint-disable @typescript-eslint/no-explicit-any */

/* ========================================
BIO SNAPSHOT RULES
======================================== */

export const knowledgeBioSnapshotRules = {

height:(height?:string)=>{

if(!height) return .9

const ideal = ["6'2","6'3","6'4","6'5"]

if(ideal.includes(height)) return 1

if(height==="6'1") return 0.93

if(height==="6'6") return 0.96

return 0.88

},

frame:(height?:string,weight?:number)=>{

if(!weight) return .9

const idealMin = 205
const idealMax = 235

if(weight>=idealMin && weight<=idealMax) return 1

if(weight>=195 && weight<205) return 0.94

if(weight>235 && weight<=250) return 0.95

return 0.9

},

hand:(throws?:string)=>{

if(!throws) return 1

if(throws==="L") return 1.03

return 1

},

pedigree:(school?:string)=>{

if(!school) return .92

const tier1 = [

"LSU",
"Vanderbilt",
"Florida",
"Auburn",
"Arkansas",
"Ole Miss",
"Mississippi State",
"TCU",
"Oregon State",
"Wake Forest",
"Florida State",
"Texas",
"Texas A&M",
"Georgia",
"Tennessee"

]

if(tier1.includes(school)) return 1

return 0.92

}

}



/* ========================================
SCOUT SNAPSHOT RULES
======================================== */

export const knowledgeScoutSnapshotRules = {

primaryTool:(tool?:string)=>{

if(!tool) return .82

const t = tool.toLowerCase()

if(t.includes("elite")) return 1

if(t.includes("plus")) return 0.96

if(t.includes("above")) return 0.92

if(t.includes("solid")) return 0.88

return 0.82

},

roleType:(role?:string)=>{

if(!role) return .85

if(role==="Ace") return 1

if(role==="#2 Starter") return 0.96

if(role==="Mid Rotation") return 0.92

if(role==="Back Rotation") return 0.87

if(role==="Reliever Risk") return 0.78

return 0.85

},

physicalProjection:(proj?:string)=>{

if(!proj) return .85

const p = proj.toLowerCase()

if(p.includes("high")) return 1

if(p.includes("some")) return 0.95

if(p.includes("mature")) return 0.9

if(p.includes("strong")) return 0.95

if(p.includes("rapid")) return 0.96

return 0.85

},

riskProfile:(risk?:string)=>{

if(!risk) return 0.8

if(risk==="Low Risk") return 1

if(risk==="Moderate Risk") return 0.92

if(risk==="Elevated Risk") return 0.85

if(risk==="High Risk") return 0.78

return 0.8

}

}