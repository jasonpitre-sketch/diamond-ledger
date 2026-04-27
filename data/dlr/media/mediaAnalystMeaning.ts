export const mediaAnalystMeaning = {

careerAwardsStrength:(v:number)=>{

if(v >= .90) return "elite award pedigree"
if(v >= .80) return "strong award recognition"
if(v >= .70) return "credible accolade history"
if(v >= .60) return "limited award support"
return "minimal accolade impact"

},

legacyStrength:(v:number)=>{

if(v >= .90) return "historic legacy profile"
if(v >= .80) return "strong career narrative weight"
if(v >= .70) return "recognizable legacy presence"
if(v >= .60) return "developing legacy profile"
return "limited historical footprint"

},

historicalVisibility:(v:number)=>{

if(v >= .85) return "persistent media relevance"
if(v >= .70) return "stable historical presence"
if(v >= .60) return "moderate long-term visibility"
if(v >= .50) return "limited historical attention"
return "low historical footprint"

},

mediaStability:(v:number)=>{

if(v >= .85) return "high narrative consistency"
if(v >= .70) return "stable coverage pattern"
if(v >= .60) return "moderate coverage stability"
if(v >= .50) return "variable coverage cycle"
return "volatile narrative exposure"

},

attentionDecayResistance:(v:number)=>{

if(v >= .85) return "slow narrative decay"
if(v >= .70) return "durable media relevance"
if(v >= .60) return "moderate attention persistence"
if(v >= .50) return "rapid visibility fade risk"
return "high decay profile"

},

milestoneAccumulation:(v:number)=>{

if(v >= .85) return "frequent milestone reinforcement"
if(v >= .70) return "strong milestone narrative support"
if(v >= .60) return "moderate milestone relevance"
if(v >= .50) return "limited milestone contribution"
return "minimal milestone narrative"

},

storyElasticity:(v:number)=>{

if(v >= .85) return "adaptable narrative structure"
if(v >= .70) return "flexible storyline evolution"
if(v >= .60) return "moderate narrative adaptability"
if(v >= .50) return "rigid narrative path"
return "fragile narrative structure"

}

}