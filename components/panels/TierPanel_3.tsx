"use client"

import styles from "./TierPanel_3.module.css"

type Props = {

  open:boolean
  children?:React.ReactNode

}

export default function TierPanel_3({

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