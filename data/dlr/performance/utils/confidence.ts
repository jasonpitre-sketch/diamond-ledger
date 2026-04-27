/* ========================================
SAMPLE CONFIDENCE
controls trust level in small samples
======================================== */


/* =============================
HITTER AB CONFIDENCE
============================= */

export function abConfidence(ab:number){

if(ab >= 220) return 1
if(ab >= 160) return .97
if(ab >= 120) return .94
if(ab >= 80) return .9
if(ab >= 50) return .86
if(ab >= 30) return .8
if(ab >= 15) return .72

return .6

}



/* =============================
PITCHER IP CONFIDENCE
============================= */

export function ipConfidence(ip:number){

if(ip >= 70) return 1
if(ip >= 55) return .96
if(ip >= 40) return .93
if(ip >= 25) return .9
if(ip >= 15) return .85
if(ip >= 8) return .78

return .65

}