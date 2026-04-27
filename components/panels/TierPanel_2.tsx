"use client"

import styles from "./TierPanel_2.module.css"

type Props = {
open:boolean
active?:boolean
title?:string
children?:React.ReactNode
}

export default function TierPanel_2({

open,
active=false,
title="SCOUT",
children

}:Props){

return(

<div className={styles.panel}>

<div className={styles.frame}/>

<div className={`${styles.door} ${open ? styles.open : ""} ${active ? styles.active : ""}`}>
<span className={styles.doorLabel}>{title}</span>
</div>

<div className={styles.data}>

<div className={`${styles.fx} ${open ? styles.fxOn : ""}`}/>

<div className={styles.inner}>


{/* CONTENT */}

<div className={styles.contentBlock}>

{children}

</div>


</div>

</div>

</div>

)

}
