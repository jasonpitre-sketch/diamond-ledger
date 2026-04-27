export function applyMeaning(
values:Record<string, number>,
meaningMap:Record<string,(v:number)=>string>
){

const result:Record<string,string> = {}

for(const key in values){

const fn = meaningMap[key]

if(typeof values[key] === "number" && fn){

result[key] = fn(values[key])

}

}

return result

}