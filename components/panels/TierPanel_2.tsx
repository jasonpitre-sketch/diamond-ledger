"use client"

import styles from "./TierPanel_2.module.css"

type Props = {

  open:boolean
  children?:React.ReactNode

}

export default function TierPanel_2({

  open,
  children

}:Props){

  return(

    <div className={styles.panel}>

      <div className={styles.frame} />

      <div
        className={`
          ${styles.door}
          ${open ? styles.open : ""}
        `}
      />

      <div className={styles.data}>

        {children}

      </div>

    </div>

  )

}