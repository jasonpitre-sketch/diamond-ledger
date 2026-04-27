export const performanceSnapshotRules = {

ERA:(v:number)=>{

if(v <= 2.80) return 1
if(v <= 3.40) return .8
if(v <= 4.00) return .65
if(v <= 4.60) return .5

return .3

},

WHIP:(v:number)=>{

if(v <= 1.05) return 1
if(v <= 1.15) return .8
if(v <= 1.30) return .65
if(v <= 1.45) return .5

return .3

}

}