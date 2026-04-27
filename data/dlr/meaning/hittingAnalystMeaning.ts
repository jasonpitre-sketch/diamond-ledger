export const hittingAnalystMeaning = {

xAVG:(v:number)=>{

if(v >= .305) return "elite expected contact"
if(v >= .285) return "strong hit probability"
if(v >= .260) return "stable contact profile"
if(v >= .240) return "below avg projection"
return "contact volatility"

},

xSLG:(v:number)=>{

if(v >= .540) return "elite power projection"
if(v >= .480) return "strong slug profile"
if(v >= .430) return "solid extra base ability"
if(v >= .390) return "limited power impact"
return "low slug projection"

},

plateDiscTrend:(v:number)=>{

if(v >= .72) return "advanced control"
if(v >= .60) return "stable approach"
if(v >= .50) return "neutral discipline"
if(v >= .40) return "approach inconsistency"
return "discipline risk"

},

contactTrend:(v:number)=>{

if(v >= .72) return "improving contact"
if(v >= .60) return "stable contact"
if(v >= .50) return "neutral contact"
if(v >= .40) return "declining contact"
return "contact concern"

},

injuryTrend:(v:number)=>{

if(v >= .75) return "durable profile"
if(v >= .60) return "stable health outlook"
if(v >= .45) return "moderate durability risk"
if(v >= .30) return "elevated injury risk"
return "high injury concern"

},

sprintTrend:(v:number)=>{

if(v >= .75) return "impact athleticism"
if(v >= .60) return "above avg mobility"
if(v >= .50) return "average speed"
if(v >= .40) return "limited speed impact"
return "minimal speed value"

},

posValue:(v:number)=>{

if(v >= .85) return "premium value"
if(v >= .70) return "positive impact"
if(v >= .55) return "neutral value"
if(v >= .40) return "limited value"
return "defensive risk"

},

consistency:(v:number)=>{

if(v >= .80) return "highly productive"
if(v >= .65) return "stable"
if(v >= .55) return "moderate consistency"
if(v >= .45) return "volatile performance"
return "high performance variance"

}

}