export const pitchingSnapshotMeaning = {

era:(v:number)=>{

if(v <= 2.80) return "elite run prevention"
if(v <= 3.40) return "above avg run prevention"
if(v <= 4.00) return "solid mlb performance"
if(v <= 4.50) return "below avg results"

return "performance risk"

},

whip:(v:number)=>{

if(v <= 1.05) return "elite traffic control"
if(v <= 1.15) return "strong command profile"
if(v <= 1.30) return "solid baserunner control"
if(v <= 1.40) return "traffic risk"

return "high traffic profile"

},

k9:(v:number)=>{

if(v >= 11) return "elite strikeout weapon"
if(v >= 9.5) return "high bat missing"
if(v >= 8) return "solid strikeout ability"
if(v >= 7) return "moderate strikeout ability"

return "low swing & miss"

},

bb9:(v:number)=>{

if(v <= 1.8) return "pinpoint control"
if(v <= 2.4) return "strong control"
if(v <= 3.0) return "solid command"
if(v <= 3.8) return "walk risk"

return "command risk"

}

}