export const pitchingAnalystMeaning = {

xERA:(v:number)=>{
if(v <= 2.90) return "elite skill projection"
if(v <= 3.40) return "strong underlying performance"
if(v <= 4.00) return "performance supported"
if(v <= 4.50) return "risk of regression"
return "performance concern"
},

stuffPlus:(v:number)=>{
if(v >= 115) return "elite arsenal"
if(v >= 105) return "above avg arsenal"
if(v >= 95) return "mlb quality stuff"
if(v >= 90) return "fringe arsenal"
return "below avg stuff"
},

pitchMixGrade:(v:number)=>{
if(v >= .70) return "highly deceptive mix"
if(v >= .60) return "effective pitch mix"
if(v >= .50) return "balanced pitch usage"
if(v >= .40) return "predictable sequencing"
return "limited mix quality"
},

veloTrend:(v:number)=>{
if(v >= .70) return "velocity improving"
if(v >= .55) return "stable velocity"
if(v >= .45) return "neutral velo trend"
if(v >= .35) return "slight velo decline"
return "velo concern"
},

commandTrend:(v:number)=>{
if(v >= .70) return "command improving"
if(v >= .60) return "stable command"
if(v >= .50) return "neutral command trend"
if(v >= .40) return "inconsistent location"
return "command concern"
},

injuryTrend:(v:number)=>{
if(v >= .70) return "durable profile"
if(v >= .55) return "stable health outlook"
if(v >= .40) return "moderate durability risk"
if(v >= .30) return "elevated injury risk"
return "high injury concern"
},

roleStability:(v:number)=>{
if(v >= .80) return "locked rotation role"
if(v >= .65) return "secure rotation role"
if(v >= .50) return "likely starter role"
if(v >= .35) return "role uncertainty"
return "unstable role"
},

war:(v:number)=>{
if(v >= 5.0) return "ace-level value"
if(v >= 3.5) return "high impact arm"
if(v >= 2.0) return "solid mlb value"
if(v >= 1.0) return "back-end contribution"
if(v >= 0.0) return "replacement-range value"
return "negative value impact"
}

}