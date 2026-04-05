"use client"

import styles from "./CableSpine.module.css"

export default function CableSpine(){

return(

<div className={styles.spine}>

<div className={styles.cableA}/>
<div className={styles.cableB}/>
<div className={styles.cableC}/>
<div className={styles.cableD}/>

<div className={styles.cableClamp}/>
<div className={styles.cableClamp2}/>

</div>

)

}