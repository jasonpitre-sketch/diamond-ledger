"use client"

import styles from "./console_Chamber.module.css"

export default function ConsoleChamber(){

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