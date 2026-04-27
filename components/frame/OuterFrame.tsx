"use client"

import styles from "./OuterFrame.module.css"
import React, { ReactNode } from "react"

type Props = {

children: ReactNode

leftTabs?: ReactNode
centerTabs?: ReactNode
rightTabs?: ReactNode

subTabs?: ReactNode

}

export default function OuterFrame({

children,

leftTabs = null,
centerTabs = null,
rightTabs = null,

subTabs = null

}: Props){

return(

<div className={styles.frame}>

<div className={styles.inner}>

<div className={styles.leftFrame}/>

{children}

<div className={styles.leftSeam}/>
<div className={styles.rightFrame}/>

</div>



{/* SUB TAB BAR */}

{subTabs && (

<div className={styles.knowledgeBar}>

<div className={styles.subTabCenter}>

{subTabs}

</div>

</div>

)}



{/* MAIN COMMAND RAIL */}

<div className={styles.bottomRail}>



<div className={styles.leftRail}>

{leftTabs}

</div>



<div className={styles.centerRail}>

{centerTabs}

</div>



<div className={styles.rightRail}>

{rightTabs}

</div>



</div>

</div>

)

}