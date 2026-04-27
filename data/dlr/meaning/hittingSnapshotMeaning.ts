export const hittingSnapshotMeaning = {

avg:(v:number)=>{

if(v >= .305) return "elite batting production"
if(v >= .285) return "strong contact hitter"
if(v >= .260) return "solid mlb average"
if(v >= .240) return "below avg contact"
return "contact risk"

},

ops:(v:number)=>{

if(v >= .930) return "elite offensive impact"
if(v >= .860) return "strong run producer"
if(v >= .780) return "solid offensive output"
if(v >= .700) return "below avg production"
return "limited offensive impact"

},

hrRate:(v:number)=>{

if(v >= .070) return "elite home run frequency"
if(v >= .055) return "strong power profile"
if(v >= .040) return "solid power output"
if(v >= .028) return "moderate power"
return "limited hr threat"

},

sbRate:(v:number)=>{

if(v >= .065) return "impact speed threat"
if(v >= .045) return "above avg baserunner"
if(v >= .025) return "moderate speed value"
if(v >= .010) return "limited steal impact"
return "minimal speed"

}

}