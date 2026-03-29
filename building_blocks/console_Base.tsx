"use client"

import styles from "./console_Base.module.css"

export default function ConsoleBase(){

return(

<div className={styles.block}>

<div className={`${styles.face} ${styles.front}`} />
<div className={`${styles.face} ${styles.back}`} />
<div className={`${styles.face} ${styles.left}`} />
<div className={`${styles.face} ${styles.right}`} />

<div className={`${styles.face} ${styles.top}`}>

{/* SLOT OPENING */}

<div className={styles.slot}/>

<div className={styles.slotGlow}/>

</div>

<div className={`${styles.face} ${styles.bottom}`} />

</div>

)

}