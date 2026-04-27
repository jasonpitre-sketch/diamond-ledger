/* =========================
DLR CONFIDENCE MEANING
========================= */

export function describeConfidence(score:number){

if(score >= 90){
return {
tier:"VERY HIGH CONFIDENCE",
meaning:"large sample with stable performance",
signal:"green"
}
}

if(score >= 80){
return {
tier:"HIGH CONFIDENCE",
meaning:"performance supported by strong sample",
signal:"green"
}
}

if(score >= 70){
return {
tier:"SOLID CONFIDENCE",
meaning:"sample size supports reliability",
signal:"blue"
}
}

if(score >= 60){
return {
tier:"MODERATE CONFIDENCE",
meaning:"performance still stabilizing",
signal:"yellow"
}
}

if(score >= 45){
return {
tier:"LOW CONFIDENCE",
meaning:"limited sample or volatile results",
signal:"orange"
}
}

return {
tier:"VERY LOW CONFIDENCE",
meaning:"insufficient data to trust trend",
signal:"red"
}

}