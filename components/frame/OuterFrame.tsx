"use client"

import styles from "./OuterFrame.module.css"
import React from "react"

type Props = {

children: React.ReactNode

modeBar?: React.ReactNode

}

export default function OuterFrame({

children,
modeBar

}:Props){

return(

<div className={styles.frame}>

<div className={styles.inner}>

<div className={styles.leftFrame}/>

{children}

<div className={styles.leftSeam}/>

<div className={styles.rightFrame}/>

</div>



{/* COMMAND RAIL */}

<div className={styles.bottomRail}>



{/* LEFT GROUP */}

<div className={styles.tabGroupLeft}>

<span className={styles.tab}>DRAFT</span>

<span className={styles.tab}>MILB</span>

<span className={styles.tab}>MLB</span>

<span className={styles.tab}>TRACKED</span>

</div>



{/* CENTER GROUP */}

<div className={styles.tabGroupCenter}>

<span className={styles.tab}>KNOWLEDGE</span>

<span className={styles.tab}>BIO</span>

</div>



{/* RIGHT GROUP */}

<div className={styles.tabGroupRight}>

{modeBar}

</div>



</div>

</div>

)

}