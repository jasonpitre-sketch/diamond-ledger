type Props = {
mode:string
infoMode:string
isPitcher:boolean
k:any
perf:any
m:any
scoutScoutRows:any
}

export default function ScoutRows({
mode,
infoMode,
isPitcher,
k,
perf,
m,
scoutScoutRows
}:Props){

if(mode==="performance"){

return isPitcher ? (

<>
<div>K% {perf?.scout?.kPercent ?? "-"}</div>
<div>BB% {perf?.scout?.bbPercent ?? "-"}</div>
<div>K-BB% {perf?.scout?.kMinusBB ?? "-"}</div>
<div>WHIFF% {perf?.scout?.whiff ?? "-"}</div>
<div>AVG EV {perf?.scout?.avgEV ?? "-"}</div>
</>

) : (

<>
<div>HARD HIT {perf?.scout?.hardHit ?? "-"}</div>
<div>BARREL {perf?.scout?.barrel ?? "-"}</div>
<div>K% {perf?.scout?.kRate ?? "-"}</div>
<div>BB% {perf?.scout?.bbRate ?? "-"}</div>
<div>AVG EV {perf?.scout?.avgEV ?? "-"}</div>
</>

)

}

if(mode==="media"){

return (
<>
<div>RECOGNITION {m?.scout?.fanRecognition ?? "-"}</div>
<div>TEAM VIS {m?.scout?.teamVisibility ?? "-"}</div>
<div>INTERVIEWS {m?.scout?.interviewPresence ?? "-"}</div>
<div>NARRATIVE {m?.scout?.narrativeStrength ?? "-"}</div>
<div>MILESTONE {m?.scout?.milestoneAttention ?? "-"}</div>
</>
)

}

if(infoMode==="bio"){

return (
<>
<div>BIRTHDATE {k?.bio?.scout?.birthdate ?? "-"}</div>
<div>SIGN BONUS {k?.bio?.scout?.signBonus ?? "-"}</div>
<div>ARCHETYPE {k?.bio?.scout?.archetype ?? "-"}</div>
<div>DEV PATH {k?.bio?.scout?.devPath ?? "-"}</div>
<div>FRAME {k?.bio?.scout?.frameScale ?? "-"}</div>
</>
)

}

if(infoMode==="career"){

return (
<>
<div>COLLEGE {k?.career?.scout?.collegeStatus ?? "-"}</div>
<div>PEDIGREE {k?.career?.scout?.draftPedigree ?? "-"}</div>
<div>PROJECTION {k?.career?.scout?.projectionPath ?? "-"}</div>
<div>ORG COMMIT {k?.career?.scout?.orgCommitment ?? "-"}</div>
<div>TOP STATUS {k?.career?.scout?.topProspectStatus ?? "-"}</div>
</>
)

}

return isPitcher ? (

<>
<div>
Fastball {k?.scout?.scout?.fastball ?? "-"}
<span>▲ {(scoutScoutRows?.fastball ?? 0).toFixed(2)}</span>
</div>

<div>
Slider {k?.scout?.scout?.slider ?? "-"}
<span>▲ {(scoutScoutRows?.slider ?? 0).toFixed(2)}</span>
</div>

<div>
Splitter {k?.scout?.scout?.splitter ?? "-"}
<span>▲ {(scoutScoutRows?.splitter ?? 0).toFixed(2)}</span>
</div>

<div>
Command {k?.scout?.scout?.command ?? "-"}
<span>▲ {(scoutScoutRows?.command ?? 0).toFixed(2)}</span>
</div>

<div>
Overall {k?.scout?.scout?.overallFV ?? "-"}
<span>▲ {(scoutScoutRows?.overallFV ?? 0).toFixed(2)}</span>
</div>

</>

) : (

<>
<div>
Hit {k?.scout?.scout?.hit ?? "-"}
<span>▲ {(scoutScoutRows?.hit ?? 0).toFixed(2)}</span>
</div>

<div>
Power {k?.scout?.scout?.power ?? "-"}
<span>▲ {(scoutScoutRows?.power ?? 0).toFixed(2)}</span>
</div>

<div>
Run {k?.scout?.scout?.run ?? "-"}
<span>▲ {(scoutScoutRows?.run ?? 0).toFixed(2)}</span>
</div>

<div>
Arm {k?.scout?.scout?.arm ?? "-"}
<span>▲ {(scoutScoutRows?.arm ?? 0).toFixed(2)}</span>
</div>

<div>
Field {k?.scout?.scout?.field ?? "-"}
<span>▲ {(scoutScoutRows?.field ?? 0).toFixed(2)}</span>
</div>

</>

)

}