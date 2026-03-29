"use client"

import styles from "./page.module.css"

import PlayerTracker from "../building_blocks/player_Tracker"
import ConsoleBase from "../building_blocks/console_Base"
import ConsoleChamber from "../building_blocks/console_Chamber"
import ConsoleTop from "../building_blocks/console_Top"
import ConsoleBottom from "../building_blocks/console_Bottom"
import CardSlab from "../building_blocks/card_Slab"


export default function Page(){

return(

<main className={styles.page}>

<div className={styles.scene}>

<div className={styles.room}>


{/* ROOM STRUCTURE */}

<div className={`${styles.wall} ${styles.backWall}`} />

<div className={`${styles.wall} ${styles.floor}`} />

<div className={`${styles.wall} ${styles.ceiling}`} />

<div className={`${styles.wall} ${styles.leftWall}`} />

<div className={`${styles.wall} ${styles.rightWall}`} />



{/* MODULES */}

<PlayerTracker/>

<ConsoleBase/>

<ConsoleChamber/>

<ConsoleTop/>

<ConsoleBottom/>

<CardSlab/>


</div>

</div>

</main>

)

}