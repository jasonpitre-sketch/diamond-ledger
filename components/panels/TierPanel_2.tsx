"use client"

import styles from "./TierPanel_2.module.css"

type DLRRow = {
label:string
value:number
max:number
}

type Props = {
open:boolean
active?:boolean
rows?:DLRRow[]
title?:string
children?:React.ReactNode
}

export default function TierPanel_2({

open,
active=false,
rows=[],
title="SCOUT",
children

}:Props){

const totalValue =
rows.reduce((sum,r)=>sum+r.value,0)

const totalMax =
rows.reduce((sum,r)=>sum+r.max,0)

return(

<div className={styles.panel}>

<div className={styles.frame}/>

<div className={`${styles.door} ${open ? styles.open : ""} ${active ? styles.active : ""}`}/>

<div className={styles.data}>

<div className={`${styles.fx} ${open ? styles.fxOn : ""}`}/>

<div className={styles.inner}>


{/* HEADER */}

<div className={styles.headerRow}>

<div className={styles.title}>
{title}
</div>

</div>


{/* FLOATING DLR */}

<div className={styles.dlrWrap}>

<div className={styles.dlrArrow}>
◀
</div>

<div className={styles.dlrValue}>

+{totalValue.toFixed(2)}

<span className={styles.headerMax}>
/{totalMax}
</span>

</div>

</div>


{/* CONTENT */}

<div className={styles.contentBlock}>

{children}

</div>


</div>

</div>

</div>

)

}
