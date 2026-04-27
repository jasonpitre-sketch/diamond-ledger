"use client"

import styles from "./TierPanel_3.module.css"

type Props = {
open:boolean
active?:boolean
title?:string
children?:React.ReactNode
}

export default function TierPanel_3({

open,
active=false,
title="ANALYST",
children

}:Props){

return(

<div className={styles.panel}>


{/* FRAME */}

<div className={styles.frame}/>


{/* DOOR */}

<div
className={`${styles.door} ${open ? styles.open : ""} ${active ? styles.active : ""}`}
>
<span className={styles.doorLabel}>{title}</span>
</div>


{/* DATA */}

<div className={styles.data}>


{/* GLASS */}

<div
className={`${styles.fx} ${open ? styles.fxOn : ""}`}
/>


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
