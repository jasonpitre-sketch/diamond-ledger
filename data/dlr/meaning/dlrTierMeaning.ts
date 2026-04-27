export function describeDLRTier(score:number){

if(score >= 90) return "ELITE ASSET"
if(score >= 82) return "CORE ASSET"
if(score >= 74) return "STRONG STARTER"
if(score >= 65) return "STABLE PLAYER"
if(score >= 55) return "ROLE PLAYER"

return "HIGH VARIANCE"

}