export const mediaSnapshotMeaning = {

mentions:(v:number)=>{

if(v >= .85) return "heavy media circulation"
if(v >= .70) return "active media presence"
if(v >= .55) return "moderate coverage volume"
if(v >= .45) return "limited media visibility"
return "minimal coverage footprint"

},

headlineFrequency:(v:number)=>{

if(v >= .85) return "frequent headline presence"
if(v >= .70) return "consistent news inclusion"
if(v >= .55) return "occasional headline visibility"
if(v >= .45) return "limited headline relevance"
return "rare headline coverage"

},

highlightFactor:(v:number)=>{

if(v >= .85) return "high highlight circulation"
if(v >= .70) return "consistent highlight interest"
if(v >= .55) return "moderate highlight exposure"
if(v >= .45) return "limited highlight presence"
return "minimal highlight visibility"

},

interviewPresence:(v:number)=>{

if(v >= .85) return "frequent interview subject"
if(v >= .70) return "regular media availability"
if(v >= .55) return "occasional interview presence"
if(v >= .45) return "limited interview demand"
return "minimal media requests"

},

socialBuzz:(v:number)=>{

if(v >= .85) return "high social media velocity"
if(v >= .70) return "active social circulation"
if(v >= .55) return "moderate online engagement"
if(v >= .45) return "limited social discussion"
return "minimal digital attention"

},

teamVisibility:(v:number)=>{

if(v >= .85) return "major market exposure"
if(v >= .70) return "strong organizational spotlight"
if(v >= .55) return "moderate market visibility"
if(v >= .45) return "limited exposure environment"
return "low visibility environment"

},

milestoneAttention:(v:number)=>{

if(v >= .85) return "milestone driven coverage"
if(v >= .70) return "notable event attention"
if(v >= .55) return "periodic milestone coverage"
if(v >= .45) return "limited milestone relevance"
return "minimal milestone narrative"

},

hypeTrend:(v:number)=>{

if(v >= .85) return "rapid hype acceleration"
if(v >= .70) return "positive visibility trend"
if(v >= .55) return "stable attention pattern"
if(v >= .45) return "softening attention trend"
return "declining visibility momentum"

}

}