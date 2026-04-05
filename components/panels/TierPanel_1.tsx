"use client"

import styles from "./TierPanel_1.module.css"

type Props = {

open:boolean
children?:React.ReactNode

}

export default function TierPanel_1({

open,
children

}:Props){

return(

<div className={styles.panel}>

  {/* FRAME (always visible) */}
  <div className={styles.frame} />

  {/* DOOR */}
  <div className={`${styles.door} ${open ? styles.open : ""}`} />

  {/* DATA LAYER */}
  <div className={styles.data}>

    {children}

  </div>

</div>

)

}