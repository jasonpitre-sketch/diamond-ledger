"use client"

import styles from "./PlayerPanel.module.css"

type Props = {
  title?: string
  headerRow?: React.ReactNode
  children: React.ReactNode
}

export default function PlayerPanel({
  title = "PLAYER TRACKER",
  headerRow,
  children
}: Props){

  return(

    <div className={styles.panel}>

      <div className={styles.header}>
        {title}
      </div>

      {headerRow && (
        <div className={styles.columnHeader}>
          {headerRow}
        </div>
      )}

      <div className={styles.scroll}>

        <div className={styles.rows}>

          {children}

        </div>

      </div>

      <div className={styles.fadeTop}/>
      <div className={styles.fadeBottom}/>

    </div>

  )

}