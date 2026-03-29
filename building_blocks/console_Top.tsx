"use client"

import styles from "./console_Top.module.css"

export default function ConsoleTop(){

return(

<div className={styles.block}>

<div className={`${styles.face} ${styles.front}`} />
<div className={`${styles.face} ${styles.back}`} />

<div className={`${styles.face} ${styles.left}`} />
<div className={`${styles.face} ${styles.right}`} />

<div className={`${styles.face} ${styles.top}`} />
<div className={`${styles.face} ${styles.bottom}`} />

</div>

)

}