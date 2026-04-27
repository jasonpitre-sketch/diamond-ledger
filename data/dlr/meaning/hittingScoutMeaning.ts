export const hittingScoutMeaning = {

hardHit:(v:number)=>{

if(v >= 50) return "elite contact authority"
if(v >= 44) return "strong contact quality"
if(v >= 38) return "solid contact profile"
if(v >= 32) return "below contact quality"
return "weak contact profile"

},

barrel:(v:number)=>{

if(v >= 14) return "elite barrel frequency"
if(v >= 11) return "strong barrel ability"
if(v >= 8) return "solid power contact"
if(v >= 6) return "moderate barrel profile"
return "limited barrel impact"

},

kPercent:(v:number)=>{

if(v <= 16) return "elite contact ability"
if(v <= 20) return "strong swing decisions"
if(v <= 24) return "average strikeout profile"
if(v <= 28) return "elevated strikeout risk"
return "high swing miss risk"

},

bbPercent:(v:number)=>{

if(v >= 14) return "elite plate discipline"
if(v >= 11) return "strong zone control"
if(v >= 8) return "solid approach"
if(v >= 6) return "below avg walk rate"
return "aggressive approach risk"

},

avgEV:(v:number)=>{

if(v >= 93) return "elite exit velocity"
if(v >= 91) return "strong contact authority"
if(v >= 89) return "solid impact quality"
if(v >= 87) return "below avg impact"
return "weak contact damage"

}

}