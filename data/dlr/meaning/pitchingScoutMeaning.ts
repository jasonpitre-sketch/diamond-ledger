export const pitchingScoutMeaning = {

kPercent:(v:number)=>{
if(v >= 30) return "elite bat missing"
if(v >= 26) return "strong strikeout skill"
if(v >= 22) return "solid bat missing"
if(v >= 18) return "average strikeout ability"
return "contact heavy profile"
},

bbPercent:(v:number)=>{
if(v <= 5) return "elite command"
if(v <= 6.5) return "above avg command"
if(v <= 8) return "solid control"
if(v <= 10) return "walk risk"
return "control risk"
},

kMinusBB:(v:number)=>{
if(v >= 22) return "ace indicator"
if(v >= 18) return "strong underlying skill"
if(v >= 14) return "positive skill signal"
if(v >= 10) return "average skill profile"
return "limited separation"
},

whiff:(v:number)=>{
if(v >= 32) return "elite swing & miss"
if(v >= 29) return "strong swing & miss"
if(v >= 25) return "consistent swing & miss"
if(v >= 22) return "moderate whiff ability"
return "limited whiff"
},

avgEV:(v:number)=>{
if(v <= 86) return "limits hard contact"
if(v <= 88.5) return "suppresses power contact"
if(v <= 90) return "neutral contact profile"
if(v <= 92) return "hard contact risk"
return "high damage risk"
}

}