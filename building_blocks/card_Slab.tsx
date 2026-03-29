"use client"

import { useEffect, useState } from "react"

import styles from "./card_Slab.module.css"


/* converts player name to file path */

function nameToFile(name?:string){

if(!name) return "/cards/placeholder.png"

return "/cards/" +

name
.toLowerCase()
.replaceAll(" ","_")
.replaceAll(".","")

+ ".png"

}


export default function CardSlab({player}:{player?:string}){

const [display,setDisplay] = useState(player || "Shohei Ohtani")

const [anim,setAnim] = useState("enter")


useEffect(()=>{

if(!player) return

setAnim("exit")

const t = setTimeout(()=>{

setDisplay(player)

setAnim("enter")

},220)

return ()=>clearTimeout(t)

},[player])


return(

<div className={styles.wrapper}>

<div className={`${styles.card} ${styles[anim]}`}>

<div className={styles.cardInner}>

<img
src={nameToFile(display)}
className={styles.image}
alt={display}
/>

</div>

</div>

</div>

)
}