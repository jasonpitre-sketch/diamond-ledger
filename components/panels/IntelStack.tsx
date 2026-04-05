"use client"

import styles from "./IntelStack.module.css"

import TierPanel_1 from "./TierPanel_1"
import TierPanel_2 from "./TierPanel_2"
import TierPanel_3 from "./TierPanel_3"

import { useEffect,useRef,useState } from "react"

type Props = {

player:any
scanComplete:boolean
mode:"performance" | "media" | "market"

}

export default function IntelStack({

player,
scanComplete,
mode

}:Props){

const [open1,setOpen1] = useState(false)
const [open2,setOpen2] = useState(false)
const [open3,setOpen3] = useState(false)

/*
track previous scan state
so animation only runs when scan completes
*/

const prevScan = useRef<boolean>(false)



useEffect(()=>{

/*
only animate when scan changes
ignore mode changes
*/

if(scanComplete && !prevScan.current){

setOpen1(false)
setOpen2(false)
setOpen3(false)

const t1 = setTimeout(()=>setOpen1(true),120)
const t2 = setTimeout(()=>setOpen2(true),260)
const t3 = setTimeout(()=>setOpen3(true),420)

return ()=>{

clearTimeout(t1)
clearTimeout(t2)
clearTimeout(t3)

}

}

prevScan.current = scanComplete

},[scanComplete,mode])



return(

<div className={styles.stack}>

<TierPanel_1 open={open1} />

<TierPanel_2 open={open2} />

<TierPanel_3 open={open3} />

</div>

)

}