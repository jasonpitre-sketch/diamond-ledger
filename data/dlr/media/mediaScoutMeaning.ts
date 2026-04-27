export const mediaScoutMeaning = {

prospectPedigree:(v:number)=>{

if(v >= .90) return "elite pedigree narrative"
if(v >= .80) return "strong pedigree support"
if(v >= .70) return "recognizable draft profile"
if(v >= .60) return "moderate pedigree relevance"
return "limited pedigree narrative"

},

narrativeStrength:(v:number)=>{

if(v >= .85) return "highly marketable storyline"
if(v >= .70) return "strong narrative structure"
if(v >= .60) return "developing narrative appeal"
if(v >= .50) return "limited narrative pull"
return "minimal narrative strength"

},

storylineDurability:(v:number)=>{

if(v >= .85) return "long-cycle storyline durability"
if(v >= .70) return "sustainable media narrative"
if(v >= .60) return "moderate narrative lifespan"
if(v >= .50) return "short-cycle narrative"
return "fragile storyline profile"

},

fanRecognition:(v:number)=>{

if(v >= .85) return "high fan awareness"
if(v >= .70) return "strong fan familiarity"
if(v >= .60) return "moderate recognition level"
if(v >= .50) return "limited fan awareness"
return "low recognition footprint"

},

featureStoryPresence:(v:number)=>{

if(v >= .85) return "frequent feature subject"
if(v >= .70) return "regular long-form interest"
if(v >= .60) return "occasional feature relevance"
if(v >= .50) return "limited feature attention"
return "minimal long-form presence"

},

breakoutProbability:(v:number)=>{

if(v >= .85) return "high breakout narrative probability"
if(v >= .70) return "strong breakout discussion presence"
if(v >= .60) return "moderate breakout potential"
if(v >= .50) return "limited breakout expectation"
return "minimal breakout narrative"

},

publicMomentum:(v:number)=>{

if(v >= .85) return "accelerating public attention"
if(v >= .70) return "positive attention trajectory"
if(v >= .60) return "stable public interest"
if(v >= .50) return "flat attention trend"
return "declining public interest"

}

}